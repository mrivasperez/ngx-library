import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './theme.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `<app-navbar /> <router-outlet />`,
})
export class AppComponent {
  constructor(public themeService: ThemeService) {}
  title = 'library';
}
