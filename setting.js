const FOCUS_KEY = "pomodoroMinutes";
const BREAK_KEY = "pomodoroBreakMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;

function isValidMinutes(value) {
  if (value === "") return false;
  const minutes = Number(value);
  return (
    Number.isInteger(minutes) && minutes >= MIN_MINUTES && minutes <= MAX_MINUTES
  );
}

function updateSaveButtonState() {
  const focusInput = document.getElementById("timer-minutes");
  const breakInput = document.getElementById("break-minutes");
  const saveBtn = document.getElementById("save-btn");
  saveBtn.disabled =
    !isValidMinutes(focusInput.value) || !isValidMinutes(breakInput.value);
}

function saveSetting() {
  const focusInput = document.getElementById("timer-minutes");
  const breakInput = document.getElementById("break-minutes");
  if (!isValidMinutes(focusInput.value) || !isValidMinutes(breakInput.value)) return;

  localStorage.setItem(FOCUS_KEY, String(Number(focusInput.value)));
  localStorage.setItem(BREAK_KEY, String(Number(breakInput.value)));
  location.href = "index.html";
}

function loadSetting() {
  const focusInput = document.getElementById("timer-minutes");
  const breakInput = document.getElementById("break-minutes");

  const savedFocus = localStorage.getItem(FOCUS_KEY);
  const savedBreak = localStorage.getItem(BREAK_KEY);

  focusInput.value = savedFocus !== null ? savedFocus : DEFAULT_FOCUS_MINUTES;
  breakInput.value = savedBreak !== null ? savedBreak : DEFAULT_BREAK_MINUTES;

  updateSaveButtonState();
}

loadSetting();
