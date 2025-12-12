import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  isScrolled = false;
  isMobileMenuOpen = false; 
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }
  
 
  @HostListener('window:resize', [])
  onWindowResize() {
    if (window.innerWidth > 850 && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}