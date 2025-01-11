class AppState {
  constructor() {
    this.isTimerRunning = false;
    this.isBreak = false;
    this.sessionCount = 0;
    this.timeLeft = 0;
  }

  updateState(newState) {
    Object.assign(this, newState);
    this.persist();
  }

  persist() {
    StorageService.set('appState', this);
  }
}
