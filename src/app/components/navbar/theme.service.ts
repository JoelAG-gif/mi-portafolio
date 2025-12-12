import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = 'dark';

  constructor() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.currentTheme = savedTheme;
      }
      this.applyTheme(this.currentTheme);
    }
  }

  private applyTheme(theme: string) {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('light-theme', 'dark-theme');
    const themeClass = theme === 'light' ? 'light-theme' : 'dark-theme';
    htmlElement.classList.add(themeClass);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }
}