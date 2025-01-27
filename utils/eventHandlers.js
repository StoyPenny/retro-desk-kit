// import { constants } from './constants.js';
import { validateDuration } from './validation.js';
export function setupEventHandlers() {
  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  resetButton.addEventListener('click', resetTimer);
  
  const startButton = document.getElementById('start-timer');
  startButton.addEventListener('click', () => {
    const duration = validateDuration(workDurationInput.value);
    // Handler logic
    startTimer(duration);
  });

}
