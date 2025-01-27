import { Calculator } from './components/Calculator.js';
import { StorageService } from '../services/StorageService.js';
import { setupEventHandlers } from '../utils/eventHandlers.js';
import { AppState } from '../services/AppState.js';
import * as constants from '../constants.js';

// Initialize app state
const appState = new AppState();

// Initialize components
const calculator = new Calculator();

// Setup event handlers
document.addEventListener('DOMContentLoaded', () => {
  setupEventHandlers();
});
