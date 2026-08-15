const FOCUS_KEY = "pomodoroMinutes";
const BREAK_KEY = "pomodoroBreakMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;
const MODE_LABEL_TEXT = { focus: "집중", break: "휴식" };

function getSavedMinutes(key, defaultMinutes) {
  const saved = localStorage.getItem(key);
  const minutes = Number(saved);
  if (
    saved !== null &&
    Number.isInteger(minutes) &&
    minutes >= MIN_MINUTES &&
    minutes <= MAX_MINUTES
  ) {
    return minutes;
  }
  return defaultMinutes;
}

let mode = "focus";
let remainingSeconds = getSavedMinutes(FOCUS_KEY, DEFAULT_FOCUS_MINUTES) * 60;
let timerId = null;

function updateModeLabel() {
  const label = document.getElementById("mode-label");
  if (label) label.textContent = MODE_LABEL_TEXT[mode];
}

function updateDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const display = document.getElementById("time-display");
  display.textContent =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function switchMode() {
  mode = mode === "focus" ? "break" : "focus";
  const key = mode === "focus" ? FOCUS_KEY : BREAK_KEY;
  const defaultMinutes =
    mode === "focus" ? DEFAULT_FOCUS_MINUTES : DEFAULT_BREAK_MINUTES;
  remainingSeconds = getSavedMinutes(key, defaultMinutes) * 60;
  updateModeLabel();
  updateDisplay();
}

function startTimer() {
  if (timerId !== null) return;

  timerId = setInterval(() => {
    if (remainingSeconds <= 0) {
      switchMode();
      return;
    }
    remainingSeconds--;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  mode = "focus";
  remainingSeconds = getSavedMinutes(FOCUS_KEY, DEFAULT_FOCUS_MINUTES) * 60;
  updateModeLabel();
  updateDisplay();
}

updateModeLabel();
updateDisplay();
