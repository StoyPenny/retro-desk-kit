import { StorageService } from '../services/StorageService.js';
import { MAX_NOTES } from '../constants.js';

export class Notes {
  constructor() {
    this.notes = StorageService.get('notes', []);
  }
  
  saveNotes() {
    StorageService.set('notes', this.notes);
  }
}
