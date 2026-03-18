
let alarmTimeout;

function showTab(tabName) {
  document.getElementById("alarm").style.display = "none";
  document.getElementById("stopwatch").style.display = "none";
  document.getElementById(tabName).style.display = "block";
}

function setAlarm() {
  const input = document.getElementById("alarmTime").value;
  const alarmStatus = document.getElementById("alarmStatus");

  if (!input) {
    alert("Please select a time.");
    return;
  }

  const now = new Date();
  const alarmDate = new Date(now.toDateString() + ' ' + input);
  if (alarmDate < now) alarmDate.setDate(alarmDate.getDate() + 1);

  const timeToAlarm = alarmDate - now;

  clearTimeout(alarmTimeout);
  alarmTimeout = setTimeout(() => {
    triggerAlarm();
  }, timeToAlarm);

  alarmStatus.innerText = `⏰ Alarm set for ${alarmDate.toLocaleTimeString()}`;
  document.getElementById("stopAlarmBtn").style.display = "none";
}

function triggerAlarm() {
  const sound = document.getElementById("alarmSound");
  sound.currentTime = 0; // Rewind to start in case it was already played
  sound.play();

  document.getElementById("alarmStatus").innerText = "🔔 Alarm ringing!";
  document.getElementById("stopAlarmBtn").style.display = "inline-block";
}

function stopAlarm() {
  const sound = document.getElementById("alarmSound");
  sound.pause();
  sound.currentTime = 0;

  document.getElementById("alarmStatus").innerText = "Alarm stopped.";
  document.getElementById("stopAlarmBtn").style.display = "none";
}

// Stopwatch with milliseconds
let stopwatchInterval;
let startTime = 0;

function startStopwatch() {
  if (stopwatchInterval) return;
  startTime = Date.now() - (startTime || 0);
  stopwatchInterval = setInterval(updateStopwatch, 10);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  startTime = 0;
  document.getElementById("stopwatchDisplay").innerText = "00:00,00";
}

function updateStopwatch() {
  const elapsed = Date.now() - startTime;
  const totalMilliseconds = elapsed;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(Math.floor((totalMilliseconds % 1000) / 10)).padStart(2, '0');

  document.getElementById("stopwatchDisplay").innerText = `${minutes}:${seconds},${milliseconds}`;
}
