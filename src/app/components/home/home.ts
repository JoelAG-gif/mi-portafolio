import { Component, OnDestroy, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
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
  
  // Control de animación
  private currentRoleIndex = 0;
  private typeSpeed = 25;
  private deleteSpeed = 20;
  private pauseTime = 1500;
  
  private timeouts: any[] = [];
  private isBrowser: boolean;
  
  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object,
    private dialog: MatDialog
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
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
    this.typeText(this.fullName, 'displayName', 0, () => {
      this.typeText(this.fullTitle, 'displayTitle', 100, () => {
        const timeout = setTimeout(() => {
          this.typeRolesCycle();
        }, 200);
        this.timeouts.push(timeout);
      });
      
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
          const timeout = setTimeout(deleteRole, this.pauseTime);
          this.timeouts.push(timeout);
        }
      };
      
      const deleteRole = () => {
        if (this.displayRole.length > 0) {
          this.displayRole = this.displayRole.slice(0, -1);
          this.cdr.detectChanges();
          const timeout = setTimeout(deleteRole, this.deleteSpeed);
          this.timeouts.push(timeout);
        } else {
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          const timeout = setTimeout(typeRole, 400);
          this.timeouts.push(timeout);
        }
      };
      
      type();
    };
    
    typeRole();
  }
  
  // FUNCIÓN PARA ABRIR EL CV
  openCV(): void {
    this.dialog.open(CVDialogComponent, {
      data: {
        title: 'Currículum Vitae - Jireh Aroni',
        pdfPath: 'assets/cv/CV-Jireh-Aroni.pdf'
      },
      width: '90%',
      maxWidth: '1000px',
      height: '90vh',
      panelClass: 'custom-modal-panel'
    });
  }
}

// ===================================================
// COMPONENTE DEL MODAL PARA VER EL CV
// ===================================================
@Component({
  selector: 'app-cv-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
    <div class="modal-container">
      
      <div class="modal-header">
        <h2>{{ data.title }}</h2>
        <button mat-icon-button mat-dialog-close class="close-icon">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      
      <div class="pdf-wrapper">
        <iframe [src]="safeUrl" type="application/pdf" width="100%" height="100%">
          <p>Tu navegador no puede mostrar este PDF.</p>
        </iframe>
      </div>
      
      <div class="modal-actions">
        <a [href]="data.pdfPath" download="CV-Jireh-Aroni.pdf" class="btn-download">
          <mat-icon>download</mat-icon> Descargar CV
        </a>
        <a [href]="data.pdfPath" target="_blank" class="btn-open">
          Abrir en nueva pestaña <mat-icon>open_in_new</mat-icon>
        </a>
        <button mat-button mat-dialog-close class="btn-close">
          Cerrar
        </button>
      </div>
      
    </div>
  `,
  styles: [`
    .modal-container {
      display: flex; 
      flex-direction: column; 
      height: 100%;
      background-color: var(--card-background);
      color: var(--text-primary);
    }
    
    .modal-header {
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .modal-header h2 { 
      margin: 0; 
      font-size: 1.1rem; 
      font-weight: 500; 
      color: var(--text-primary);
    }
    
    .close-icon { color: var(--text-secondary); }
    
    .pdf-wrapper { 
      flex-grow: 1; 
      background-color: #525659;
      position: relative; 
    }
    
    iframe { 
      border: none; 
      width: 100%; 
      height: 100%; 
      display: block; 
    }
    
    .modal-actions {
      padding: 15px 20px;
      border-top: 1px solid var(--border-color);
      display: flex; 
      justify-content: flex-end; 
      gap: 15px;
      background-color: var(--card-background);
      flex-wrap: wrap;
    }
    
    .btn-download {
      text-decoration: none;
      display: flex; 
      align-items: center; 
      gap: 8px;
      padding: 8px 16px; 
      border-radius: 5px;
      background-color: #10b981;
      color: white;
      font-weight: 500; 
      font-size: 0.9rem;
      transition: 0.3s;
      cursor: pointer;
    }
    
    .btn-download:hover { background-color: #059669; }
    .btn-download mat-icon { font-size: 18px; width: 18px; height: 18px; }
    
    .btn-open {
      text-decoration: none;
      display: flex; 
      align-items: center; 
      gap: 8px;
      padding: 8px 16px; 
      border-radius: 5px;
      background-color: var(--primary-color);
      color: white;
      font-weight: 500; 
      font-size: 0.9rem;
      transition: 0.3s;
    }
    
    .btn-open:hover { background-color: var(--secondary-color); }
    .btn-open mat-icon { font-size: 18px; width: 18px; height: 18px; }
    
    .btn-close {
      background-color: #ef4444 !important;
      color: white !important;
      font-weight: 500;
    }
    
    .btn-close:hover { background-color: #dc2626 !important; }
    
    @media (max-width: 768px) {
      .modal-actions {
        flex-direction: column;
      }
      
      .btn-download,
      .btn-open,
      .btn-close {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class CVDialogComponent {
  safeUrl: SafeResourceUrl;
  
  constructor(
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.pdfPath);
  }
}