let startTime = null;
let elapsedTime = 0;
let animationFrameId = null;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateTime() {
  const now = performance.now();
  const time = now - startTime + elapsedTime;
  display.textContent = formatTime(time);
  animationFrameId = requestAnimationFrame(updateTime);
}

function start() {
  if (!isRunning) {
    startTime = performance.now();
    animationFrameId = requestAnimationFrame(updateTime);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    cancelAnimationFrame(animationFrameId);
    elapsedTime += performance.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  cancelAnimationFrame(animationFrameId);
  startTime = null;
  elapsedTime = 0;
  isRunning = false;
  lapCount = 0;
  display.textContent = "00:00.000";
  laps.innerHTML = "";
}

function lap() {
  if (isRunning) {
    const now = performance.now();
    const currentLap = now - startTime + elapsedTime;
    const li = document.createElement("li");
    li.textContent = `Lap ${++lapCount}: ${formatTime(currentLap)}`;
    laps.appendChild(li);
  }
}
