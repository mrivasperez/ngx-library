import { Injectable } from '@angular/core';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
}

export interface ShortcutAction {
  id: string;
  name: string;
  description: string;
  action: () => void;
  shortcut?: KeyboardShortcut;
}

@Injectable({
  providedIn: 'root'
})
export class NgxKeysService {
  private shortcuts = new Map<string, ShortcutAction>();
  private isRecording = false;
  private recordingCallback?: (shortcut: KeyboardShortcut) => void;

  constructor() {
    // Listen for keydown events globally
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  /**
   * Register a shortcut action
   */
  registerAction(action: ShortcutAction): void {
    this.shortcuts.set(action.id, action);
  }

  /**
   * Assign a keyboard shortcut to an action
   */
  assignShortcut(actionId: string, shortcut: KeyboardShortcut): void {
    const action = this.shortcuts.get(actionId);
    if (action) {
      action.shortcut = shortcut;
      this.shortcuts.set(actionId, action);
    }
  }

  /**
   * Remove a shortcut from an action
   */
  removeShortcut(actionId: string): void {
    const action = this.shortcuts.get(actionId);
    if (action) {
      delete action.shortcut;
      this.shortcuts.set(actionId, action);
    }
  }

  /**
   * Get all registered actions
   */
  getAllActions(): ShortcutAction[] {
    return Array.from(this.shortcuts.values());
  }

  /**
   * Start recording a keyboard shortcut
   */
  startRecording(callback: (shortcut: KeyboardShortcut) => void): void {
    this.isRecording = true;
    this.recordingCallback = callback;
  }

  /**
   * Stop recording a keyboard shortcut
   */
  stopRecording(): void {
    this.isRecording = false;
    this.recordingCallback = undefined;
  }

  /**
   * Check if currently recording
   */
  get recording(): boolean {
    return this.isRecording;
  }

  /**
   * Format shortcut for display
   */
  formatShortcut(shortcut: KeyboardShortcut): string {
    const parts: string[] = [];
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.altKey) parts.push('Alt');
    if (shortcut.shiftKey) parts.push('Shift');
    if (shortcut.metaKey) parts.push('Meta');
    parts.push(shortcut.key.toUpperCase());
    return parts.join(' + ');
  }

  private handleKeyDown(event: KeyboardEvent): void {
    // If recording, capture the key combination
    if (this.isRecording && this.recordingCallback) {
      event.preventDefault();
      
      // Don't record modifier keys alone
      if (['Control', 'Alt', 'Shift', 'Meta'].includes(event.key)) {
        return;
      }
      
      const shortcut: KeyboardShortcut = {
        key: event.key,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        metaKey: event.metaKey
      };
      this.recordingCallback(shortcut);
      this.stopRecording();
      return;
    }

    // Check if any registered shortcut matches
    for (const action of this.shortcuts.values()) {
      if (action.shortcut && this.matchesShortcut(event, action.shortcut)) {
        event.preventDefault();
        action.action();
        break;
      }
    }
  }

  private matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
    return (
      event.key === shortcut.key &&
      !!event.ctrlKey === !!shortcut.ctrlKey &&
      !!event.altKey === !!shortcut.altKey &&
      !!event.shiftKey === !!shortcut.shiftKey &&
      !!event.metaKey === !!shortcut.metaKey
    );
  }
}
