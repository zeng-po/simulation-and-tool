let workspace;
let isPCConnected = false;
let pcPollInterval = null;
let runningPollInterval = null;
let mousePollInterval = null;
let speedMultiplier = 1.0;
const RUNNER_URL = 'http://127.0.0.1:5678';
const jsGenerator = Blockly.JavaScript || (window.javascript && window.javascript.javascriptGenerator);

// Local log console helpers
function addLog(text, type = 'system') {
    const consoleEl = document.getElementById('logConsole');
    const countEl = document.getElementById('logCount');
    if (!consoleEl || !countEl) return;
    
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.innerHTML = `[${timeStr}] ${text}`;
    
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
    
    const count = consoleEl.getElementsByClassName('log-line').length;
    countEl.innerText = count;
}

function clearLogs() {
    const consoleEl = document.getElementById('logConsole');
    if (consoleEl) consoleEl.innerHTML = '';
    const countEl = document.getElementById('logCount');
    if (countEl) countEl.innerText = '0';
    addLog('執行日誌已清空。', 'system');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Blockly Workspace
    initBlockly();
    
    // 2. Register UI Listeners
    setupUIListeners();
    
    // 3. Start polling local python runner connection
    startPCPolling();
});

function initBlockly() {
    // Inject Blockly
    workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        grid: {
            spacing: 24,
            length: 4,
            colour: '#cbd5e1',
            snap: true
        },
        zoom: {
            controls: true,
            wheel: true,
            startScale: 0.95,
            maxScale: 2.5,
            minScale: 0.4,
            scaleSpeed: 1.2
        },
        trashcan: true
    });

    // Handle workspace changes to update codes
    workspace.addChangeListener((event) => {
        if (event.type === Blockly.Events.BLOCK_MOVE ||
            event.type === Blockly.Events.BLOCK_CHANGE ||
            event.type === Blockly.Events.BLOCK_DELETE ||
            event.type === Blockly.Events.BLOCK_CREATE ||
            event.type === Blockly.Events.VAR_CREATE ||
            event.type === Blockly.Events.VAR_RENAME ||
            event.type === Blockly.Events.VAR_DELETE) {
            updateGeneratedCode();
        }
    });

    // Make Blockly responsive
    const blocklyDiv = document.getElementById('blocklyDiv');
    const onResize = () => {
        Blockly.svgResize(workspace);
    };
    window.addEventListener('resize', onResize);
    onResize();

    // Load initial empty structure or a demo block if desired
    // We start empty, giving a clean slate
}

function updateGeneratedCode() {
    try {
        // Javascript Code (Used internally for generating command queue)
        const jsCode = jsGenerator.workspaceToCode(workspace);
        // We don't display JS code to user since they want Python/AHK scripts,
        // so we only generate it to evaluate and build command queue for the PC runner.
        
        // Python Code
        const pythonCode = pyGen.workspaceToCode(workspace);
        document.getElementById('codePython').innerText = pythonCode || '# 請拖曳積木至工作區來生成代碼';
    } catch (e) {
        console.error("代碼生成錯誤:", e);
    }
}

function setupUIListeners() {
    // Run on PC button
    document.getElementById('btnRunPC').addEventListener('click', () => {
        if (!isPCConnected) return;
        
        // Generate command queue for backend
        const jsCode = jsGenerator.workspaceToCode(workspace);
        if (!jsCode.trim()) {
            addLog("⚠️ 工作區沒有任何積木指令！", "error");
            return;
        }

        let commandQueue = [];
        let loopCounter = 0;
        
        function addCommand(cmd) { commandQueue.push(cmd); }
        function checkLoopLimit() {
            loopCounter++;
            if (loopCounter > 5000) throw new Error("LOOP_LIMIT_EXCEEDED");
        }
        function getMousePos() { return { x: 0, y: 0 }; } // PC gets coordinates locally

        try {
            const runner = new Function('addCommand', 'checkLoopLimit', 'getMousePos', jsCode);
            runner(addCommand, checkLoopLimit, getMousePos);
            
            // Send command queue to local runner backend
            runCommandsOnPC(commandQueue);
        } catch (e) {
            addLog(`❌ 準備執行錯誤：${e.message}`, "error");
        }
    });

    // Stop button
    document.getElementById('btnStop').addEventListener('click', () => {
        if (isPCConnected) {
            stopCommandsOnPC();
        }
    });

    // Reset button
    document.getElementById('btnReset').addEventListener('click', () => {
        clearLogs();
        addLog("🧹 系統已重設。", "system");
    });

    // Clear Workspace
    document.getElementById('btnClearWorkspace').addEventListener('click', () => {
        if (confirm("確定要清空工作區的所有積木嗎？")) {
            workspace.clear();
            updateGeneratedCode();
            addLog("🗑️ 積木工作區已清空。", "system");
        }
    });

    // Speed slider UI value syncing
    const speedSlider = document.getElementById('speedSlider');
    const speedVal = document.getElementById('speedValue');
    speedSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        let speed = 1.0;
        
        if (val <= 2) {
            speed = 0.25 * val;
        } else if (val <= 5) {
            speed = 0.5 + (val - 2) * 0.166; // val=5 -> 1.0
        } else if (val <= 9) {
            speed = 1.0 + (val - 5) * 1.0; // val=9 -> 5.0
        } else {
            speed = 10.0; // val=10 -> instant
        }
        
        speedMultiplier = speed;
        speedVal.innerText = speed === 10.0 ? "極速" : `${speed.toFixed(1)}x`;
    });

    // Transparency slider UI value syncing
    const transparencySlider = document.getElementById('transparencySlider');
    const transparencyValue = document.getElementById('transparencyValue');
    if (transparencySlider && transparencyValue) {
        transparencySlider.addEventListener('input', (e) => {
            const alpha = parseInt(e.target.value);
            const percent = Math.round((alpha / 255) * 100);
            transparencyValue.innerText = `${percent}%`;
            
            if (isPCConnected) {
                setPCTransparency(alpha);
            }
        });
    }

    // Tabs button handlers
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabContentId = tab.getAttribute('data-tab');
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            document.getElementById(tabContentId).classList.add('active');
        });
    });

    // Copy Python Script
    document.getElementById('btnCopyPython').addEventListener('click', () => {
        const pyText = document.getElementById('codePython').innerText;
        navigator.clipboard.writeText(pyText).then(() => {
            alert("Python 代碼已複製到剪貼簿！");
        });
    });

    // Download Python Script
    document.getElementById('btnDownloadPython').addEventListener('click', () => {
        const pyText = document.getElementById('codePython').innerText;
        downloadFile(pyText, 'robo_macro.py', 'text/plain');
    });

    // Download local_runner.py helper script
    const btnDownloadRunner = document.getElementById('btnDownloadRunner');
    if (btnDownloadRunner) {
        btnDownloadRunner.addEventListener('click', () => {
            try {
                if (typeof RUNNER_BASE64 !== 'undefined') {
                    const byteCharacters = atob(RUNNER_BASE64);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const file = new Blob([byteArray], {type: 'text/x-python'});
                    
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(file);
                    a.download = 'local_runner.py';
                    a.click();
                    URL.revokeObjectURL(a.href);
                } else {
                    alert('找不到本機輔助程式內容，請重試！');
                }
            } catch (e) {
                console.error("下載失敗:", e);
                alert('下載輔助程式失敗，請重新整理頁面後重試。');
            }
        });
    }

    document.getElementById('btnClearLogs').addEventListener('click', () => {
        clearLogs();
    });
}

// File downloading helper
function downloadFile(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}


// ==========================================
// 4. PC RUNNER CONNECTOR LOGIC (HTTP polling)
// ==========================================

function startPCPolling() {
    // Check local server connection status every 2 seconds
    checkPCConnection();
    pcPollInterval = setInterval(checkPCConnection, 2000);
}

function checkPCConnection() {
    // Avoid checking when executing PC commands to not flood requests
    if (document.getElementById('connectionStatus').classList.contains('running')) return;
    
    fetch(`${RUNNER_URL}/status`)
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                isPCConnected = true;
            } else {
                isPCConnected = false;
            }
            updateConnectionStatusUI();
        })
        .catch(err => {
            isPCConnected = false;
            updateConnectionStatusUI();
        });
}

function updateConnectionStatusUI() {
    const statusDot = document.querySelector('#connectionStatus .status-dot');
    const statusText = document.querySelector('#connectionStatus .status-text');
    const btnRunPC = document.getElementById('btnRunPC');
    const btnStop = document.getElementById('btnStop');
    const realMouseDisplay = document.getElementById('realMouseDisplay');
    const transparencySlider = document.getElementById('transparencySlider');
    const transparencyValue = document.getElementById('transparencyValue');
    
    if (isPCConnected) {
        statusDot.className = 'status-dot connected';
        statusText.innerText = 'PC 控制器已連線';
        btnRunPC.disabled = false;
        if (transparencySlider) transparencySlider.disabled = false;
        
        // Start physical mouse coordinates polling
        if (!mousePollInterval) {
            mousePollInterval = setInterval(pollMousePosition, 100);
        }
    } else {
        statusDot.className = 'status-dot disconnected';
        statusText.innerText = 'PC 控制器已斷線';
        btnRunPC.disabled = true;
        if (transparencySlider) {
            transparencySlider.disabled = true;
            transparencySlider.value = 255;
        }
        if (transparencyValue) transparencyValue.innerText = "100%";
        
        // Stop physical mouse coordinates polling
        if (mousePollInterval) {
            clearInterval(mousePollInterval);
            mousePollInterval = null;
        }
        document.getElementById('realX').innerText = "-";
        document.getElementById('realY').innerText = "-";
        realMouseDisplay.className = "real-mouse-display disconnected";
    }
}

// Post commands array to Python backend
function runCommandsOnPC(commands) {
    // Update UI states to running on PC
    document.getElementById('btnRunPC').disabled = true;
    document.getElementById('btnStop').disabled = false;
    
    const statusDot = document.querySelector('#connectionStatus .status-dot');
    const statusText = document.querySelector('#connectionStatus .status-text');
    statusDot.className = 'status-dot running';
    statusText.innerText = 'PC 實機運行中...';
    
    addLog("🚀 發送指令序列至本機 PC，將於 2 秒後開始執行...", "system");
    
    // Send to backend
    fetch(`${RUNNER_URL}/run`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            commands: commands,
            speed: speedMultiplier
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Start polling execution status on PC
            pollPCExecutionStatus();
        } else {
            addLog(`❌ PC 執行錯誤：${data.error}`, "error");
            restorePCUI();
        }
    })
    .catch(err => {
        addLog("❌ 無法連線至 PC 控制輔助程式，執行已終止。", "error");
        restorePCUI();
    });
}

// Poll local server during PC execution
function pollPCExecutionStatus() {
    runningPollInterval = setInterval(() => {
        fetch(`${RUNNER_URL}/status`)
            .then(res => res.json())
            .then(data => {
                // If the runner is done/idle, restore UI
                if (data.status === 'idle') {
                    clearInterval(runningPollInterval);
                    addLog("✅ PC 實機指令序列執行完畢。", "success");
                    restorePCUI();
                } else if (data.status === 'running') {
                    // Update log queue from server if available (optional, server logs can be retrieved)
                    if (data.last_action) {
                        addLog(`[PC] 執行：${data.last_action}`, "system");
                    }
                }
            })
            .catch(err => {
                clearInterval(runningPollInterval);
                restorePCUI();
            });
    }, 500);
}

// Stop execution on PC
function stopCommandsOnPC() {
    fetch(`${RUNNER_URL}/stop`, { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            addLog("🛑 已向本機傳送停止訊號！", "error");
            if (runningPollInterval) clearInterval(runningPollInterval);
            restorePCUI();
        })
        .catch(err => {
            addLog("🛑 傳送停止訊號時發生錯誤。", "error");
            restorePCUI();
        });
}

function restorePCUI() {
    if (runningPollInterval) clearInterval(runningPollInterval);
    updateConnectionStatusUI();
    document.getElementById('btnStop').disabled = true;
}

function pollMousePosition() {
    if (!isPCConnected) return;
    
    fetch(`${RUNNER_URL}/mouse_position`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById('realX').innerText = data.x;
                document.getElementById('realY').innerText = data.y;
                document.getElementById('realMouseDisplay').className = "real-mouse-display connected";
            }
        })
        .catch(err => {
            // Silence error here, checkPCConnection handles connection status resets
        });
}

function setPCTransparency(alpha) {
    fetch(`${RUNNER_URL}/transparency`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alpha: alpha })
    })
    .catch(err => {
        // Silently catch errors if PC disconnected or not running
    });
}
