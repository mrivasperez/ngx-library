import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxKeysService, ShortcutAction, KeyboardShortcut } from '../../shared/ngx-keys.service';

@Component({
  selector: 'app-customization',
  imports: [],
  templateUrl: './customization.component.html',
  styleUrl: './customization.component.css'
})
export class CustomizationComponent implements OnInit {
  actions: ShortcutAction[] = [];
  recordingActionId: string | null = null;

  constructor(
    private ngxKeys: NgxKeysService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeActions();
    this.actions = this.ngxKeys.getAllActions();
  }

  private initializeActions(): void {
    // Define predefined actions that users can assign shortcuts to
    const predefinedActions: Omit<ShortcutAction, 'shortcut'>[] = [
      {
        id: 'go-to-library',
        name: 'Go to Library',
        description: 'Navigate to the main library page',
        action: () => this.router.navigate(['/'])
      },
      {
        id: 'add-book',
        name: 'Add Book',
        description: 'Navigate to book search page to add a new book',
        action: () => this.router.navigate(['/search'])
      },
      {
        id: 'scan-book',
        name: 'Scan Book',
        description: 'Navigate to the book scanning page',
        action: () => this.router.navigate(['/scan'])
      },
      {
        id: 'toggle-theme',
        name: 'Toggle Theme',
        description: 'Switch between light and dark theme',
        action: () => {
          // This would toggle theme if theme service was available
          console.log('Theme toggle action triggered');
        }
      },
      {
        id: 'focus-search',
        name: 'Focus Search',
        description: 'Focus on the search input when on search page',
        action: () => {
          const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }
      }
    ];

    // Register all actions
    predefinedActions.forEach(action => {
      this.ngxKeys.registerAction(action as ShortcutAction);
    });
  }

  startRecording(actionId: string): void {
    this.recordingActionId = actionId;
    this.ngxKeys.startRecording((shortcut: KeyboardShortcut) => {
      this.assignShortcut(actionId, shortcut);
      this.recordingActionId = null;
    });
  }

  assignShortcut(actionId: string, shortcut: KeyboardShortcut): void {
    this.ngxKeys.assignShortcut(actionId, shortcut);
    this.actions = this.ngxKeys.getAllActions();
  }

  removeShortcut(actionId: string): void {
    this.ngxKeys.removeShortcut(actionId);
    this.actions = this.ngxKeys.getAllActions();
  }

  formatShortcut(shortcut: KeyboardShortcut): string {
    return this.ngxKeys.formatShortcut(shortcut);
  }

  isRecording(actionId: string): boolean {
    return this.recordingActionId === actionId;
  }

  get recording(): boolean {
    return this.ngxKeys.recording;
  }
}
