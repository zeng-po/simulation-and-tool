import threading
import time
import pyautogui
import ctypes
from flask import Flask, request, jsonify

# Windows Win32 API functions for window transparency
def get_app_window_hwnd():
    target_hwnd = [None]
    WNDENUMPROC = ctypes.WINFUNCTYPE(ctypes.c_bool, ctypes.c_void_p, ctypes.c_void_p)
    
    def enum_windows_callback(hwnd, lParam):
        length = ctypes.windll.user32.GetWindowTextLengthW(hwnd)
        if length > 0:
            buffer = ctypes.create_unicode_buffer(length + 1)
            ctypes.windll.user32.GetWindowTextW(hwnd, buffer, length + 1)
            title = buffer.value
            if "積木鍵鼠控制器" in title:
                target_hwnd[0] = hwnd
                return False  # stop enumerating
        return True

    enum_proc = WNDENUMPROC(enum_windows_callback)
    ctypes.windll.user32.EnumWindows(enum_proc, 0)
    return target_hwnd[0]

def set_app_transparency(alpha):
    hwnd = get_app_window_hwnd()
    if not hwnd:
        hwnd = ctypes.windll.user32.GetForegroundWindow()
    if hwnd:
        GWL_EXSTYLE = -20
        WS_EX_LAYERED = 0x00080000
        LWA_ALPHA = 0x00000002
        
        style = ctypes.windll.user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
        if not (style & WS_EX_LAYERED):
            ctypes.windll.user32.SetWindowLongW(hwnd, GWL_EXSTYLE, style | WS_EX_LAYERED)
            
        ctypes.windll.user32.SetLayeredWindowAttributes(hwnd, 0, alpha, LWA_ALPHA)

app = Flask(__name__)

# Global variables to handle states
queue_lock = threading.Lock()
commands_queue = []
runner_status = "idle"
last_action = ""
stop_requested = False
speed_multiplier = 1.0

# Add CORS headers manually to remove dependency on flask-cors
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Core execution thread loop
def execute_queue():
    global runner_status, last_action, stop_requested, commands_queue, speed_multiplier
    
    # 2 seconds buffer delay to allow the user to focus the target app window
    time.sleep(2.0)
    
    # Enable PyAutoGUI fail-safe: moving mouse to screen corners stops script
    pyautogui.FAILSAFE = True
    
    # Key normalization function
    def get_pyautogui_key(k):
        k = k.upper()
        mapping = {
            'ENTER': 'enter',
            'BACKSPACE': 'backspace',
            'TAB': 'tab',
            'SPACE': 'space',
            'ESC': 'escape',
            'DELETE': 'delete',
            'SHIFT': 'shift',
            'CTRL': 'ctrl',
            'ALT': 'alt',
            'WIN': 'win',
            'UP': 'up',
            'DOWN': 'down',
            'LEFT': 'left',
            'RIGHT': 'right'
        }
        return mapping.get(k, k.lower())

    try:
        for cmd in commands_queue:
            if stop_requested:
                last_action = "Stopped by user"
                break
                
            action = cmd.get("action")
            
            # Speed scaling adjustments
            # Normal speed (1x): move takes 0.25s, writing interval 0.05s
            # Faster speeds scale down durations. Speed = 10.0 runs instantly.
            move_duration = 0.25 / speed_multiplier if speed_multiplier < 10.0 else 0
            wait_duration = cmd.get("seconds", 0) / speed_multiplier if speed_multiplier < 10.0 else 0
            type_interval = 0.05 / speed_multiplier if speed_multiplier < 10.0 else 0
            
            if action == "mouse_move":
                x = int(cmd.get("x", 0))
                y = int(cmd.get("y", 0))
                last_action = f"Move mouse to ({x}, {y})"
                pyautogui.moveTo(x, y, duration=move_duration)
                
            elif action == "mouse_move_relative":
                dx = int(cmd.get("dx", 0))
                dy = int(cmd.get("dy", 0))
                last_action = f"Move mouse relative ({dx}, {dy})"
                pyautogui.moveRel(dx, dy, duration=move_duration)
                
            elif action == "mouse_click":
                btn = cmd.get("button", "left")
                click_type = cmd.get("click_type", "click")
                last_action = f"Click mouse {btn} button ({click_type})"
                
                if click_type == "click":
                    pyautogui.click(button=btn)
                elif click_type == "double":
                    pyautogui.doubleClick(button=btn)
                elif click_type == "down":
                    pyautogui.mouseDown(button=btn)
                elif click_type == "up":
                    pyautogui.mouseUp(button=btn)
                    
            elif action == "mouse_drag":
                x = int(cmd.get("x", 0))
                y = int(cmd.get("y", 0))
                last_action = f"Drag mouse to ({x}, {y})"
                pyautogui.dragTo(x, y, button="left", duration=move_duration)
                
            elif action == "mouse_scroll":
                direction = cmd.get("direction", "down")
                amount = int(cmd.get("amount", 3))
                # PyAutoGUI scroll is positive for up, negative for down
                scroll_amount = amount if direction == "up" else -amount
                last_action = f"Scroll wheel {direction} {amount} units"
                pyautogui.scroll(scroll_amount)
                
            elif action == "keyboard_type":
                text = cmd.get("text", "")
                last_action = f"Keyboard type text: \"{text}\""
                pyautogui.write(text, interval=type_interval)
                
            elif action == "keyboard_press":
                key = get_pyautogui_key(cmd.get("key", ""))
                last_action = f"Press key: {key}"
                pyautogui.press(key)
                
            elif action == "keyboard_combo":
                mod = cmd.get("modifier", "").lower()
                key = cmd.get("key", "").lower()
                last_action = f"Press Hotkey combo: {mod}+{key}"
                pyautogui.hotkey(mod, key)
                
            elif action == "keyboard_down_up":
                key_action = cmd.get("key_action", "down")
                key = get_pyautogui_key(cmd.get("key", ""))
                last_action = f"Key {key_action}: {key}"
                if key_action == "down":
                    pyautogui.keyDown(key)
                else:
                    pyautogui.keyUp(key)
                    
            elif action == "control_wait":
                last_action = f"Delay wait {cmd.get('seconds', 0)} seconds"
                time.sleep(wait_duration)
                
            # Small delay between executing macro commands to keep OS responsive
            time.sleep(0.05)
            
        if stop_requested:
            last_action = "Aborted: Stopped by user"
        else:
            last_action = "Finished: Macro executed successfully"
            
    except pyautogui.FailSafeException:
        last_action = "Aborted: Fail-safe triggered! (Mouse reached screen corner)"
        print("⚠️ 警告：偵測到滑鼠移至螢幕角落，Fail-safe 安全防線已啟動！")
    except Exception as e:
        last_action = f"Error occurred: {str(e)}"
        print(f"❌ 錯誤：執行指令時發生異常: {str(e)}")
        
    finally:
        with queue_lock:
            runner_status = "idle"
            commands_queue.clear()
        print("ℹ️ 執行緒結束，回復為閒置狀態。")

# --- Flask routes ---

@app.route('/status', methods=['GET'])
def get_status():
    global runner_status, last_action
    return jsonify({
        "status": runner_status,
        "last_action": last_action
    })

@app.route('/mouse_position', methods=['GET'])
def get_mouse_position():
    try:
        x, y = pyautogui.position()
        return jsonify({
            "success": True,
            "x": x,
            "y": y
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/run', methods=['POST'])
def run_queue():
    global runner_status, last_action, commands_queue, stop_requested, speed_multiplier
    
    if runner_status == "running":
        return jsonify({"success": False, "error": "Already running"}), 400
        
    data = request.json or {}
    commands = data.get("commands", [])
    speed = float(data.get("speed", 1.0))
    
    if not commands:
        return jsonify({"success": False, "error": "No commands provided"}), 400
        
    with queue_lock:
        commands_queue = commands
        speed_multiplier = speed
        stop_requested = False
        runner_status = "running"
        last_action = "Initializing execution..."
        
    print(f"🚀 開始執行積木序列，指令數量: {len(commands)}，執行速度倍率: {speed}x")
    
    # Start thread
    threading.Thread(target=execute_queue, daemon=True).start()
    return jsonify({"success": True})

@app.route('/stop', methods=['POST'])
def stop_queue():
    global stop_requested
    print("🛑 收到使用者要求終止指令！")
    stop_requested = True
    return jsonify({"success": True})

@app.route('/transparency', methods=['POST'])
def set_transparency():
    data = request.json or {}
    alpha = int(data.get("alpha", 255))
    try:
        set_app_transparency(alpha)
        return jsonify({"success": True})
    except Exception as e:
        print(f"❌ 設置透明度失敗: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    print("=" * 60)
    print("   積木鍵鼠控制器 本機輔助連線伺服器已啟動")
    print("   API 位址: http://127.0.0.1:5678")
    print("   安全提示: 任何時候將真實滑鼠移到『螢幕四個角落』即可終止執行")
    print("=" * 60)
    app.run(host='127.0.0.1', port=5678, debug=False)
