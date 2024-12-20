import {
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private currentTheme: 'light' | 'dark' = 'light';
  private renderer: Renderer2;
  private mediaQueryListener: ((event: MediaQueryListEvent) => void) | null =
    null;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.detectDeviceTheme();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    this.renderer.setAttribute(
      document.documentElement,
      'data-bs-theme',
      theme
    );
  }

  detectDeviceTheme(): void {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.handleDeviceThemeChange(mediaQuery);
      this.mediaQueryListener = (event) => {
        this.handleDeviceThemeChange(event);
      };
      mediaQuery.addEventListener('change', this.mediaQueryListener);
    }
  }

  private handleDeviceThemeChange(event: MediaQueryList | MediaQueryListEvent) {
    if (event.matches) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  get currentThemeValue(): 'light' | 'dark' {
    return this.currentTheme;
  }

  ngOnDestroy(): void {
    if (this.mediaQueryListener) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.removeEventListener('change', this.mediaQueryListener);
    }
  }
}
