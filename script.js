let timer;
let isWorking = true;
let isRunning = false;

// DOM要素の取得
const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');

// 初期設定
let initialWorkTime = parseInt(workTimeInput.value) * 60;
let initialBreakTime = parseInt(breakTimeInput.value) * 60;
let remainingTime = initialWorkTime;

// 設定値の変更時に即座に反映
function updateSettings() {
    // 入力値のバリデーション
    const workTime = parseInt(workTimeInput.value);
    const breakTime = parseInt(breakTimeInput.value);
    
    if (isNaN(workTime) || workTime <= 0) {
        workTimeInput.value = 25; // デフォルト値にリセット
        return;
    }
    if (isNaN(breakTime) || breakTime <= 0) {
        breakTimeInput.value = 5; // デフォルト値にリセット
        return;
    }

    initialWorkTime = workTime * 60;
    initialBreakTime = breakTime * 60;
    
    // タイマーが実行中でない場合、設定値を即座に反映
    if (!isRunning) {
        remainingTime = initialWorkTime;
        updateDisplay();
    }
}

// 設定値の変更を即座に反映
workTimeInput.addEventListener('change', updateSettings);
breakTimeInput.addEventListener('change', updateSettings);

// 時間表示の更新
function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// タイマーの更新
function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
    } else {
        isWorking = !isWorking; // 作業時間と休憩時間を切り替え
        remainingTime = isWorking ? initialWorkTime : initialBreakTime;
        updateDisplay();
        playSound();
    }
}

// 音を鳴らす
function playSound() {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.play();
}

// スタートボタンの処理
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = false;
    }
});

// ストップボタンの処理
stopBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// リセットボタンの処理
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    remainingTime = initialWorkTime;
    isWorking = true;
    updateDisplay();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// 設定値の変更時に初期値を更新
workTimeInput.addEventListener('change', () => {
    initialWorkTime = parseInt(workTimeInput.value) * 60;
    if (!isRunning) {
        remainingTime = initialWorkTime;
        updateDisplay();
    }
});

breakTimeInput.addEventListener('change', () => {
    initialBreakTime = parseInt(breakTimeInput.value) * 60;
});

// 初期表示
updateDisplay();
