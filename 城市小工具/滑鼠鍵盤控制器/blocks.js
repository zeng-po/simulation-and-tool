// Define custom categories and block structures
Blockly.common.defineBlocksWithJsonArray([
    // 1. Mouse Move To
    {
        "type": "mouse_move",
        "message0": "🎯 移動滑鼠到 X %1 Y %2",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#00c3ff",
        "tooltip": "將滑鼠移動到指定的螢幕座標 (X, Y)",
        "helpUrl": ""
    },
    // 2. Mouse Move Relative
    {
        "type": "mouse_move_relative",
        "message0": "↗️ 相對移動滑鼠 DX %1 DY %2",
        "args0": [
            {
                "type": "input_value",
                "name": "DX",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "DY",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#00c3ff",
        "tooltip": "從當前位置移動滑鼠 (正 DX 向右，正 DY 向下)",
        "helpUrl": ""
    },
    // 3. Mouse Click
    {
        "type": "mouse_click",
        "message0": "🖱️ 點擊滑鼠 %1 鍵 %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "BUTTON",
                "options": [
                    ["左", "left"],
                    ["右", "right"],
                    ["中", "middle"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "CLICK_TYPE",
                "options": [
                    ["單擊", "click"],
                    ["雙擊", "double"],
                    ["按下", "down"],
                    ["放開", "up"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#00c3ff",
        "tooltip": "執行滑鼠點擊、雙擊或按鍵按下與放開",
        "helpUrl": ""
    },
    // 4. Mouse Drag To
    {
        "type": "mouse_drag",
        "message0": "✍️ 拖曳滑鼠到 X %1 Y %2",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#00c3ff",
        "tooltip": "按住滑鼠左鍵並移動到指定坐標後放開",
        "helpUrl": ""
    },
    // 5. Mouse Scroll
    {
        "type": "mouse_scroll",
        "message0": "📜 滾動滾輪 %1 %2 單位",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    ["向上", "up"],
                    ["向下", "down"]
                ]
            },
            {
                "type": "input_value",
                "name": "AMOUNT",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#00c3ff",
        "tooltip": "向上或向下滾動滑鼠滾輪",
        "helpUrl": ""
    },
    // 6. Get Mouse X
    {
        "type": "mouse_get_x",
        "message0": "📍 獲取滑鼠 X 座標",
        "output": "Number",
        "colour": "#00c3ff",
        "tooltip": "獲取滑鼠當前位置的 X 座標",
        "helpUrl": ""
    },
    // 7. Get Mouse Y
    {
        "type": "mouse_get_y",
        "message0": "📍 獲取滑鼠 Y 座標",
        "output": "Number",
        "colour": "#00c3ff",
        "tooltip": "獲取滑鼠當前位置的 Y 座標",
        "helpUrl": ""
    },
    // 8. Keyboard Type Text
    {
        "type": "keyboard_type",
        "message0": "⌨️ 輸入文字 %1",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#d900ff",
        "tooltip": "輸入一串文字字串",
        "helpUrl": ""
    },
    // 9. Keyboard Press Special Key
    {
        "type": "keyboard_press",
        "message0": "⌨️ 按下按鍵 %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "KEY",
                "options": [
                    ["Enter", "ENTER"],
                    ["Backspace", "BACKSPACE"],
                    ["Tab", "TAB"],
                    ["Space", "SPACE"],
                    ["Escape", "ESC"],
                    ["Delete", "DELETE"],
                    ["Shift", "SHIFT"],
                    ["Ctrl", "CTRL"],
                    ["Alt", "ALT"],
                    ["Win", "WIN"],
                    ["↑ 向上鍵", "UP"],
                    ["↓ 向下鍵", "DOWN"],
                    ["← 向左鍵", "LEFT"],
                    ["→ 向右鍵", "RIGHT"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#d900ff",
        "tooltip": "按下並釋放指定的特殊按鍵",
        "helpUrl": ""
    },
    // 10. Keyboard Combo (Hotkey)
    {
        "type": "keyboard_combo",
        "message0": "⌨️ 組合鍵 %1 + %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MODIFIER",
                "options": [
                    ["Ctrl", "CTRL"],
                    ["Shift", "SHIFT"],
                    ["Alt", "ALT"],
                    ["Win", "WIN"]
                ]
            },
            {
                "type": "field_input",
                "name": "KEY",
                "text": "c"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#d900ff",
        "tooltip": "按下組合鍵（例如 Ctrl+C）",
        "helpUrl": ""
    },
    // 11. Keyboard Down / Up (Hold & Release)
    {
        "type": "keyboard_down_up",
        "message0": "⌨️ %1 鍵盤按鍵 %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "ACTION",
                "options": [
                    ["按住", "down"],
                    ["放開", "up"]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "KEY",
                "options": [
                    ["Shift", "SHIFT"],
                    ["Ctrl", "CTRL"],
                    ["Alt", "ALT"],
                    ["Win", "WIN"],
                    ["Enter", "ENTER"],
                    ["Space", "SPACE"]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#d900ff",
        "tooltip": "持續按住或釋放指定的按鍵",
        "helpUrl": ""
    },
    // 12. Control Wait
    {
        "type": "control_wait",
        "message0": "⏳ 等待 %1 秒",
        "args0": [
            {
                "type": "input_value",
                "name": "SECONDS",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#ff9900",
        "tooltip": "延遲執行指定的秒數",
        "helpUrl": ""
    },
    // 13. Control Forever Loop
    {
        "type": "control_forever",
        "message0": "🔄 無限重複 %1 執行 %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#ff9900",
        "tooltip": "無限次數重複執行內部的積木",
        "helpUrl": ""
    }
]);

// Initialize generator targets
const jsGen = Blockly.JavaScript || (window.javascript && window.javascript.javascriptGenerator);
const pyGen = Blockly.Python || (window.python && window.python.pythonGenerator);

// Helper function to handle variable / values cleanly
const getVal = (block, name, order, fallback) => {
    return jsGen.valueToCode(block, name, order) || fallback;
};

// ==========================================
// 1. JAVASCRIPT GENERATOR (For Simulation Commands)
// ==========================================

jsGen['mouse_move'] = function(block) {
    const x = getVal(block, 'X', jsGen.ORDER_ATOMIC, '0');
    const y = getVal(block, 'Y', jsGen.ORDER_ATOMIC, '0');
    return `addCommand({action: 'mouse_move', x: ${x}, y: ${y}});\n`;
};

jsGen['mouse_move_relative'] = function(block) {
    const dx = getVal(block, 'DX', jsGen.ORDER_ATOMIC, '0');
    const dy = getVal(block, 'DY', jsGen.ORDER_ATOMIC, '0');
    return `addCommand({action: 'mouse_move_relative', dx: ${dx}, dy: ${dy}});\n`;
};

jsGen['mouse_click'] = function(block) {
    const btn = block.getFieldValue('BUTTON');
    const type = block.getFieldValue('CLICK_TYPE');
    return `addCommand({action: 'mouse_click', button: '${btn}', click_type: '${type}'});\n`;
};

jsGen['mouse_drag'] = function(block) {
    const x = getVal(block, 'X', jsGen.ORDER_ATOMIC, '0');
    const y = getVal(block, 'Y', jsGen.ORDER_ATOMIC, '0');
    return `addCommand({action: 'mouse_drag', x: ${x}, y: ${y}});\n`;
};

jsGen['mouse_scroll'] = function(block) {
    const dir = block.getFieldValue('DIRECTION');
    const amount = getVal(block, 'AMOUNT', jsGen.ORDER_ATOMIC, '0');
    return `addCommand({action: 'mouse_scroll', direction: '${dir}', amount: ${amount}});\n`;
};

jsGen['mouse_get_x'] = function(block) {
    return [`getMousePos().x`, jsGen.ORDER_FUNCTION_CALL];
};

jsGen['mouse_get_y'] = function(block) {
    return [`getMousePos().y`, jsGen.ORDER_FUNCTION_CALL];
};

jsGen['keyboard_type'] = function(block) {
    const text = getVal(block, 'TEXT', jsGen.ORDER_ATOMIC, "''");
    return `addCommand({action: 'keyboard_type', text: ${text}});\n`;
};

jsGen['keyboard_press'] = function(block) {
    const key = block.getFieldValue('KEY');
    return `addCommand({action: 'keyboard_press', key: '${key}'});\n`;
};

jsGen['keyboard_combo'] = function(block) {
    const mod = block.getFieldValue('MODIFIER');
    const key = block.getFieldValue('KEY');
    return `addCommand({action: 'keyboard_combo', modifier: '${mod}', key: '${key}'});\n`;
};

jsGen['keyboard_down_up'] = function(block) {
    const action = block.getFieldValue('ACTION');
    const key = block.getFieldValue('KEY');
    return `addCommand({action: 'keyboard_down_up', key_action: '${action}', key: '${key}'});\n`;
};

jsGen['control_wait'] = function(block) {
    const sec = getVal(block, 'SECONDS', jsGen.ORDER_ATOMIC, '0');
    return `addCommand({action: 'control_wait', seconds: ${sec}});\n`;
};

jsGen['control_forever'] = function(block) {
    const branch = jsGen.statementToCode(block, 'DO');
    // Implement loop guard for infinite loop in simulation generator
    return `while(true) {\n  checkLoopLimit();\n${branch}}\n`;
};


// ==========================================
// 2. PYTHON GENERATOR (For pyautogui Script)
// ==========================================

// Extend Python generator init to include our custom modules and setup
const originalPyInit = pyGen.init;
pyGen.init = function(workspace) {
    // Call standard init
    const initCode = originalPyInit.call(pyGen, workspace);
    // Add custom definitions
    pyGen.definitions_['import_pyautogui'] = 'import pyautogui';
    pyGen.definitions_['import_time'] = 'import time';
    pyGen.definitions_['failsafe'] = 'pyautogui.FAILSAFE = True  # Move mouse to any corner to abort execution';
    return initCode + 'time.sleep(2)  # 給予 2 秒緩衝時間，方便使用者切換視窗\n\n';
};

// Custom Block Implementations for Python
pyGen['mouse_move'] = function(block) {
    const x = pyGen.valueToCode(block, 'X', pyGen.ORDER_NONE) || '0';
    const y = pyGen.valueToCode(block, 'Y', pyGen.ORDER_NONE) || '0';
    return `pyautogui.moveTo(${x}, ${y}, duration=0.25)\n`;
};

pyGen['mouse_move_relative'] = function(block) {
    const dx = pyGen.valueToCode(block, 'DX', pyGen.ORDER_NONE) || '0';
    const dy = pyGen.valueToCode(block, 'DY', pyGen.ORDER_NONE) || '0';
    return `pyautogui.moveRel(${dx}, ${dy}, duration=0.25)\n`;
};

pyGen['mouse_click'] = function(block) {
    const btn = block.getFieldValue('BUTTON');
    const type = block.getFieldValue('CLICK_TYPE');
    let code = '';
    if (type === 'click') {
        code = `pyautogui.click(button='${btn}')\n`;
    } else if (type === 'double') {
        code = `pyautogui.doubleClick(button='${btn}')\n`;
    } else if (type === 'down') {
        code = `pyautogui.mouseDown(button='${btn}')\n`;
    } else if (type === 'up') {
        code = `pyautogui.mouseUp(button='${btn}')\n`;
    }
    return code;
};

pyGen['mouse_drag'] = function(block) {
    const x = pyGen.valueToCode(block, 'X', pyGen.ORDER_NONE) || '0';
    const y = pyGen.valueToCode(block, 'Y', pyGen.ORDER_NONE) || '0';
    return `pyautogui.dragTo(${x}, ${y}, button='left', duration=0.25)\n`;
};

pyGen['mouse_scroll'] = function(block) {
    const dir = block.getFieldValue('DIRECTION');
    const amount = pyGen.valueToCode(block, 'AMOUNT', pyGen.ORDER_NONE) || '3';
    const scrollAmount = (dir === 'up') ? amount : `-${amount}`;
    return `pyautogui.scroll(${scrollAmount})\n`;
};

pyGen['mouse_get_x'] = function(block) {
    return ['pyautogui.position()[0]', pyGen.ORDER_FUNCTION_CALL];
};

pyGen['mouse_get_y'] = function(block) {
    return ['pyautogui.position()[1]', pyGen.ORDER_FUNCTION_CALL];
};

pyGen['keyboard_type'] = function(block) {
    const text = pyGen.valueToCode(block, 'TEXT', pyGen.ORDER_NONE) || '""';
    return `pyautogui.write(${text}, interval=0.05)\n`;
};

// Python Key Mapping Helper
function pyKeyMap(key) {
    const map = {
        'ENTER': 'enter',
        'BACKSPACE': 'backspace',
        'TAB': 'tab',
        'SPACE': 'space',
        'ESC': 'esc',
        'DELETE': 'delete',
        'SHIFT': 'shift',
        'CTRL': 'ctrl',
        'ALT': 'alt',
        'WIN': 'win',
        'UP': 'up',
        'DOWN': 'down',
        'LEFT': 'left',
        'RIGHT': 'right'
    };
    return map[key] || key.toLowerCase();
}

pyGen['keyboard_press'] = function(block) {
    const key = block.getFieldValue('KEY');
    return `pyautogui.press('${pyKeyMap(key)}')\n`;
};

pyGen['keyboard_combo'] = function(block) {
    const mod = block.getFieldValue('MODIFIER').toLowerCase();
    const key = block.getFieldValue('KEY').toLowerCase();
    return `pyautogui.hotkey('${mod}', '${key}')\n`;
};

pyGen['keyboard_down_up'] = function(block) {
    const action = block.getFieldValue('ACTION');
    const key = pyKeyMap(block.getFieldValue('KEY'));
    if (action === 'down') {
        return `pyautogui.keyDown('${key}')\n`;
    } else {
        return `pyautogui.keyUp('${key}')\n`;
    }
};

pyGen['control_wait'] = function(block) {
    const sec = pyGen.valueToCode(block, 'SECONDS', pyGen.ORDER_NONE) || '0';
    return `time.sleep(${sec})\n`;
};

pyGen['control_forever'] = function(block) {
    const branch = pyGen.statementToCode(block, 'DO') || '  pass\n';
    return `while True:\n${branch}`;
};


// ==========================================
// 3. AUTOHOTKEY GENERATOR
// ==========================================

const ahkGen = new Blockly.Generator('AHK');

ahkGen.init = function(workspace) {
    ahkGen.definitions_ = {};
    ahkGen.definitions_['header'] = '; AutoHotkey 腳本 - 自動生成\n#NoEnv\nSendMode Input\nSetWorkingDir %A_ScriptDir%\nCoordMode, Mouse, Screen  ; 使用全螢幕絕對座標\n';
    return '';
};

ahkGen.finish = function(code) {
    const definitions = [];
    for (let key in ahkGen.definitions_) {
        definitions.push(ahkGen.definitions_[key]);
    }
    return definitions.join('\n') + '\n\n; 按 F9 可以緊急暫停或關閉此腳本\nF9::\nExitApp\nreturn\n\n; --- 開始執行 ---\nSleep, 2000  ; 緩衝時間\n' + code + '\nExitApp';
};

ahkGen.scrub_ = function(block, code, thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = thisOnly ? '' : ahkGen.blockToCode(nextBlock);
    return code + nextCode;
};

ahkGen['math_number'] = function(block) {
    const code = Number(block.getFieldValue('NUM'));
    return [code, ahkGen.ORDER_ATOMIC];
};

ahkGen['math_arithmetic'] = function(block) {
    const OPERATORS = {
        'ADD': [' + ', ahkGen.ORDER_ADDITIVE],
        'MINUS': [' - ', ahkGen.ORDER_ADDITIVE],
        'MULTIPLY': [' * ', ahkGen.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' / ', ahkGen.ORDER_MULTIPLICATIVE]
    };
    const tuple = OPERATORS[block.getFieldValue('OP')];
    const operator = tuple[0];
    const order = tuple[1];
    const argument0 = ahkGen.valueToCode(block, 'A', order) || '0';
    const argument1 = ahkGen.valueToCode(block, 'B', order) || '0';
    return [argument0 + operator + argument1, order];
};

ahkGen['math_random_int'] = function(block) {
    const fromVal = ahkGen.valueToCode(block, 'FROM', ahkGen.ORDER_NONE) || '0';
    const toVal = ahkGen.valueToCode(block, 'TO', ahkGen.ORDER_NONE) || '0';
    // AHK Random command: Random, OutputVar, Min, Max
    // To support inline generation, we will define a function or output a var. 
    // For simplicity, we create a helper definition
    ahkGen.definitions_['helper_rand'] = 'RandomInt(min, max) {\n  Random, r, min, max\n  return r\n}\n';
    return [`RandomInt(${fromVal}, ${toVal})`, ahkGen.ORDER_FUNCTION_CALL];
};

// Variable mappings
ahkGen['variables_get'] = function(block) {
    const varName = block.getField('VAR').getText();
    return [varName, ahkGen.ORDER_ATOMIC];
};

ahkGen['variables_set'] = function(block) {
    const argument0 = ahkGen.valueToCode(block, 'VALUE', ahkGen.ORDER_NONE) || '0';
    const varName = block.getField('VAR').getText();
    return varName + ' := ' + argument0 + '\n';
};

// Logic AHK
ahkGen['controls_if'] = function(block) {
    let n = 0;
    let code = '';
    do {
        let conditionCode = ahkGen.valueToCode(block, 'IF' + n, ahkGen.ORDER_NONE) || 'false';
        let branchCode = ahkGen.statementToCode(block, 'DO' + n) || '';
        code += (n === 0 ? 'if (' : 'else if (') + conditionCode + ') {\n' + branchCode + '}\n';
        n++;
    } while (block.getInput('IF' + n));
    
    if (block.getInput('ELSE')) {
        let branchCode = ahkGen.statementToCode(block, 'ELSE') || '';
        code += 'else {\n' + branchCode + '}\n';
    }
    return code;
};

ahkGen['logic_compare'] = function(block) {
    const OPERATORS = {
        'EQ': '=',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    const operator = OPERATORS[block.getFieldValue('OP')];
    const order = ahkGen.ORDER_RELATIONAL;
    const argument0 = ahkGen.valueToCode(block, 'A', order) || '0';
    const argument1 = ahkGen.valueToCode(block, 'B', order) || '0';
    return [argument0 + ' ' + operator + ' ' + argument1, order];
};

ahkGen['logic_operation'] = function(block) {
    const operator = (block.getFieldValue('OP') === 'AND') ? '&&' : '||';
    const order = (operator === '&&') ? ahkGen.ORDER_LOGICAL_AND : ahkGen.ORDER_LOGICAL_OR;
    let argument0 = ahkGen.valueToCode(block, 'A', order) || 'false';
    let argument1 = ahkGen.valueToCode(block, 'B', order) || 'false';
    return [argument0 + ' ' + operator + ' ' + argument1, order];
};

ahkGen['logic_boolean'] = function(block) {
    const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
    return [code, ahkGen.ORDER_ATOMIC];
};

ahkGen['controls_repeat_ext'] = function(block) {
    const repeats = ahkGen.valueToCode(block, 'TIMES', ahkGen.ORDER_NONE) || '0';
    const branch = ahkGen.statementToCode(block, 'DO') || '';
    return `Loop, % ${repeats} {\n${branch}}\n`;
};

// Custom Block Implementations for AHK
ahkGen['mouse_move'] = function(block) {
    const x = ahkGen.valueToCode(block, 'X', ahkGen.ORDER_NONE) || '0';
    const y = ahkGen.valueToCode(block, 'Y', ahkGen.ORDER_NONE) || '0';
    return `MouseMove, ${x}, ${y}\n`;
};

ahkGen['mouse_move_relative'] = function(block) {
    const dx = ahkGen.valueToCode(block, 'DX', ahkGen.ORDER_NONE) || '0';
    const dy = ahkGen.valueToCode(block, 'DY', ahkGen.ORDER_NONE) || '0';
    return `MouseMove, ${dx}, ${dy}, 0, R\n`;
};

ahkGen['mouse_click'] = function(block) {
    const btn = block.getFieldValue('BUTTON');
    const type = block.getFieldValue('CLICK_TYPE');
    
    let clickCmd = '';
    const btnName = (btn === 'left') ? 'Left' : (btn === 'right') ? 'Right' : 'Middle';
    
    if (type === 'click') {
        clickCmd = `Click, ${btnName}\n`;
    } else if (type === 'double') {
        clickCmd = `Click, ${btnName}, 2\n`;
    } else if (type === 'down') {
        clickCmd = `Click, ${btnName}, Down\n`;
    } else if (type === 'up') {
        clickCmd = `Click, ${btnName}, Up\n`;
    }
    return clickCmd;
};

ahkGen['mouse_drag'] = function(block) {
    const x = ahkGen.valueToCode(block, 'X', ahkGen.ORDER_NONE) || '0';
    const y = ahkGen.valueToCode(block, 'Y', ahkGen.ORDER_NONE) || '0';
    return `MouseClickDrag, Left, , , ${x}, ${y}\n`;
};

ahkGen['mouse_scroll'] = function(block) {
    const dir = block.getFieldValue('DIRECTION');
    const amount = ahkGen.valueToCode(block, 'AMOUNT', ahkGen.ORDER_NONE) || '3';
    const scrollKey = (dir === 'up') ? 'WheelUp' : 'WheelDown';
    return `Click, ${scrollKey}, % ${amount}\n`;
};

ahkGen['mouse_get_x'] = function(block) {
    ahkGen.definitions_['helper_mousepos'] = 'GetMouseX() {\n  MouseGetPos, mx, my\n  return mx\n}\n';
    return ['GetMouseX()', ahkGen.ORDER_FUNCTION_CALL];
};

ahkGen['mouse_get_y'] = function(block) {
    ahkGen.definitions_['helper_mousepos'] = 'GetMouseY() {\n  MouseGetPos, mx, my\n  return my\n}\n';
    return ['GetMouseY()', ahkGen.ORDER_FUNCTION_CALL];
};

ahkGen['keyboard_type'] = function(block) {
    let text = ahkGen.valueToCode(block, 'TEXT', ahkGen.ORDER_NONE) || '""';
    // Remove wrapping quotes if present
    if (text.startsWith('"') && text.endsWith('"')) {
        text = text.substring(1, text.length - 1);
    } else if (text.startsWith("'") && text.endsWith("'")) {
        text = text.substring(1, text.length - 1);
    }
    return `Send, {Raw}${text}\n`;
};

function ahkKeyMap(key) {
    const map = {
        'ENTER': '{Enter}',
        'BACKSPACE': '{Backspace}',
        'TAB': '{Tab}',
        'SPACE': '{Space}',
        'ESC': '{Esc}',
        'DELETE': '{Delete}',
        'SHIFT': '{Shift}',
        'CTRL': '{Control}',
        'ALT': '{Alt}',
        'WIN': '{LWin}',
        'UP': '{Up}',
        'DOWN': '{Down}',
        'LEFT': '{Left}',
        'RIGHT': '{Right}'
    };
    return map[key] || `{${key}}`;
}

ahkGen['keyboard_press'] = function(block) {
    const key = block.getFieldValue('KEY');
    return `Send, ${ahkKeyMap(key)}\n`;
};

ahkGen['keyboard_combo'] = function(block) {
    const mod = block.getFieldValue('MODIFIER');
    const key = block.getFieldValue('KEY');
    
    let prefix = '';
    if (mod === 'CTRL') prefix = '^';
    else if (mod === 'SHIFT') prefix = '+';
    else if (mod === 'ALT') prefix = '!';
    else if (mod === 'WIN') prefix = '#';
    
    return `Send, ${prefix}${key}\n`;
};

ahkGen['keyboard_down_up'] = function(block) {
    const action = block.getFieldValue('ACTION');
    const key = block.getFieldValue('KEY');
    
    // AutoHotkey down/up: Send, {Shift Down} or Send, {Shift Up}
    let keyName = key.toLowerCase();
    // Capitalize first letter
    keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1);
    if (keyName === 'Ctrl') keyName = 'Control';
    
    const act = (action === 'down') ? 'Down' : 'Up';
    return `Send, {${keyName} ${act}}\n`;
};

ahkGen['control_wait'] = function(block) {
    const sec = ahkGen.valueToCode(block, 'SECONDS', ahkGen.ORDER_NONE) || '0';
    // Convert to milliseconds for AHK Sleep
    let ms = 0;
    if (!isNaN(parseFloat(sec))) {
        ms = Math.round(parseFloat(sec) * 1000);
        return `Sleep, ${ms}\n`;
    } else {
        return `Sleep, % int(${sec} * 1000)\n`;
    }
};

ahkGen['control_forever'] = function(block) {
    const branch = ahkGen.statementToCode(block, 'DO') || '';
    return `Loop {\n${branch}}\n`;
};

// ==========================================
// MODERN BLOCKLY FORBLOCK COMPATIBILITY LAYER
// ==========================================
[jsGen, pyGen, ahkGen].forEach(generator => {
    if (generator) {
        // Ensure forBlock object exists
        if (!generator.forBlock) {
            generator.forBlock = {};
        }
        // Copy all functions defined directly on the generator to forBlock
        const excludeKeys = ['init', 'finish', 'scrub_', 'workspaceToCode', 'blockToCode', 'ORDER_ATOMIC', 'ORDER_NONE', 'ORDER_ADDITIVE', 'ORDER_MULTIPLICATIVE', 'ORDER_RELATIONAL', 'ORDER_LOGICAL_AND', 'ORDER_LOGICAL_OR', 'ORDER_FUNCTION_CALL'];
        for (let key in generator) {
            if (typeof generator[key] === 'function' && !excludeKeys.includes(key)) {
                generator.forBlock[key] = generator[key];
            }
        }
    }
});

