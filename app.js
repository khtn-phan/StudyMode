// Minimal JS for Study Mode 167
// Persist using localStorage


// Utils
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);


// Mode switching
const modeButtons = document.querySelectorAll('.mode-btn');
const panes = document.querySelectorAll('[data-pane]');
modeButtons.forEach(btn => btn.addEventListener('click', () => {
modeButtons.forEach(b => b.classList.remove('active'));
btn.classList.add('active');
const mode = btn.dataset.mode;
panes.forEach(p => p.classList.add('hidden'));
document.getElementById(mode).classList.remove('hidden');
}));


// ------------------ Focus Mode (Pomodoro + Single Task) ------------------
let timerInterval = null;
let remainingSec = 25 * 60;
let running = false;


const focusTask = $('#focus-task');
const timerMin = $('#timer-min');
const timerSec = $('#timer-sec');
const startBtn = $('#start-btn');
const pauseBtn = $('#pause-btn');
const resetBtn = $('#reset-btn');
const pomodoroSelect = $('#pomodoro-length');


function setRemainingFromSelect(){
const minutes = parseInt(pomodoroSelect.value,10) || 25;
remainingSec = minutes * 60;
updateTimerDisplay();
}


function updateTimerDisplay(){
const m = Math.floor(remainingSec/60).toString().padStart(2,'0');
const s = Math.floor(remainingSec%60).toString().padStart(2,'0');
timerMin.textContent = m;
timerSec.textContent = s;
}


function startTimer(){
if(!focusTask.value.trim()){
alert('Please set one task before starting.');
return;
}
// End of app.js
