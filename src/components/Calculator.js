import { safeEval } from '../../utils/errorHandling.js';

export class Calculator {
  constructor() {
    this.display = document.getElementById('result');
  }

  appendValue(value) {
    if (this.display.value === '0' && value !== '.') {
      this.display.value = value;
    } else {
      this.display.value += value;
    }
  }
  // Other calculator methods
}
