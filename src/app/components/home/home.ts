import { Component, OnDestroy, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnDestroy {
  // Textos que se mostrarán (empiezan vacíos)
  displayName = '';
  displayTitle = '';
  displayRole = '';
  displayDescription = '';
  
  // Textos completos
  private fullName = 'Hola, soy Jireh Aroni';
  private fullTitle = 'Estudiante de Ingeniería de Sistema Computacional.';
  private roles = ['Desarrollador Frontend', 'Analista de Datos'];
  private fullDescription = 'Especializado en crear interfaces web interactivas con Angular y en la visualización de datos para la toma de decisiones con Python, SQL y Power BI.';
  
  // Control de animación - MÁS RÁPIDO
  private currentRoleIndex = 0;
  private typeSpeed = 25; 
  private deleteSpeed = 20;
  private pauseTime = 1500;
  
  private timeouts: any[] = [];
  private isBrowser: boolean;
  
  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // INICIAR INMEDIATAMENTE en el constructor
    if (this.isBrowser) {
      requestAnimationFrame(() => {
        this.startTypingAnimation();
      });
    }
  }
  
  ngOnDestroy(): void {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
  }
  
  private startTypingAnimation(): void {
    // 1. Escribir el nombre INMEDIATAMENTE (sin delay)
    this.typeText(this.fullName, 'displayName', 0, () => {
      // 2. Escribir el título
      this.typeText(this.fullTitle, 'displayTitle', 100, () => {
        // 3. Iniciar ciclo de roles
        const timeout = setTimeout(() => {
          this.typeRolesCycle();
        }, 200);
        this.timeouts.push(timeout);
      });
      
      // 4. Escribir descripción (en paralelo con el título)
      this.typeText(this.fullDescription, 'displayDescription', 300);
    });
  }
  
  private typeText(
    text: string, 
    property: 'displayName' | 'displayTitle' | 'displayRole' | 'displayDescription', 
    delay: number, 
    callback?: () => void
  ): void {
    const timeout = setTimeout(() => {
      let index = 0;
      const type = () => {
        if (index < text.length) {
          this[property] += text.charAt(index);
          this.cdr.detectChanges(); 
          index++;
          const timeout = setTimeout(type, this.typeSpeed);
          this.timeouts.push(timeout);
        } else if (callback) {
          callback();
        }
      };
      type();
    }, delay);
    this.timeouts.push(timeout);
  }
  
  private typeRolesCycle(): void {
    const typeRole = () => {
      const currentRole = this.roles[this.currentRoleIndex];
      
      
      let index = 0;
      const type = () => {
        if (index < currentRole.length) {
          this.displayRole += currentRole.charAt(index);
          this.cdr.detectChanges(); 
          index++;
          const timeout = setTimeout(type, this.typeSpeed);
          this.timeouts.push(timeout);
        } else {
          // Pausar antes de borrar
          const timeout = setTimeout(deleteRole, this.pauseTime);
          this.timeouts.push(timeout);
        }
      };
      
      // Borrar el rol actual
      const deleteRole = () => {
        if (this.displayRole.length > 0) {
          this.displayRole = this.displayRole.slice(0, -1);
          this.cdr.detectChanges(); 
          const timeout = setTimeout(deleteRole, this.deleteSpeed);
          this.timeouts.push(timeout);
        } else {
          // Cambiar al siguiente rol
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          const timeout = setTimeout(typeRole, 400);
          this.timeouts.push(timeout);
        }
      };
      
      type();
    };
    
    typeRole();
  }
}