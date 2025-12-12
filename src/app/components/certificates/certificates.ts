import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { 
  MatDialog, 
  MatDialogModule, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css']
})
export class CertificatesComponent {
  
  constructor(public dialog: MatDialog) {}

  // IMPORTANTE: Renombra tus archivos PDF en la carpeta assets para quitar espacios
  certifications = [
    { 
      title: 'CCNA: Redes Empresariales, Seguridad y Automatización', 
      source: 'Cisco Networking Academy', 
      icon: 'router', 
      link: 'assets/certificados/redes-empresariales.pdf' 
    },
    { 
      title: 'CCNA: Fundamentos de Conmutación y Enrutamiento', 
      source: 'Cisco Networking Academy', 
      icon: 'wifi', 
      link: 'assets/certificados/fundamentos-enrutamiento.pdf' 
    },
    { 
      title: 'AWS Academy Graduate - Machine Learning NLP', 
      source: 'AWS Academy', 
      icon: 'cloud', 
      // Si es un link web, usa la URL completa. Si es PDF, usa ruta local.
      link: 'assets/certificados/aws-machine-learning.pdf' 
    },
    { 
      title: 'Fundamentos de Python 1', 
      source: 'Python Institute', 
      icon: 'code', 
      link: 'assets/certificados/python1.pdf' 
    },
    { 
      title: 'Partner: CLP - Advanced Programming in C', 
      source: 'Cisco Networking Academy', 
      icon: 'terminal', 
      link: 'assets/certificados/clp-c.pdf' 
    },
    { 
      title: 'Introducción a la Ciberseguridad', 
      source: 'Cisco Networking Academy', 
      icon: 'security', 
      link: 'assets/certificados/ciberseguridad.pdf' 
    },
    { 
      title: 'Fundamentos de IA con IBM SkillsBuild', 
      source: 'IBM SkillsBuild', 
      icon: 'smart_toy', 
      link: 'assets/certificados/ia-ibm.pdf' 
    },
    { 
      title: 'Introducción a la Ciencia de Datos', 
      source: 'Cisco Networking Academy', 
      icon: 'analytics', 
      link: 'assets/certificados/data-science.pdf' 
    },
    { 
      title: 'Introduction to IoT', 
      source: 'Cisco Networking Academy', 
      icon: 'settings_remote', 
      link: 'assets/certificados/iot.pdf' 
    },
    { 
      title: 'Conciencia Digital', 
      source: 'Cisco Networking Academy', 
      icon: 'fingerprint', 
      link: 'assets/certificados/conciencia-digital.pdf' 
    }
  ];

  openCertificate(cert: any) {
    if (cert.link.startsWith('http') && !cert.link.includes('assets')) {
      window.open(cert.link, '_blank');
    } else {
      this.dialog.open(CertificateDialogComponent, {
        data: cert,
        width: '90%',
        maxWidth: '1000px',
        height: '90vh',
        panelClass: 'custom-modal-panel' 
      });
    }
  }
}

// --- COMPONENTE MODAL ---
@Component({
  selector: 'app-certificate-dialog',
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
        <a [href]="data.link" target="_blank" class="btn-open">
          Abrir en nueva pestaña <mat-icon>open_in_new</mat-icon>
        </a>

        <button mat-button mat-dialog-close class="btn-close">
          Cerrar
        </button>
      </div>

    </div>
  `,
  styles: [`
    /* CONTENEDOR PRINCIPAL */
    .modal-container {
      display: flex; flex-direction: column; height: 100%;
      background-color: #112240; 
      color: white;
    }

    /* HEADER */
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .modal-header h2 { margin: 0; font-size: 1.1rem; font-weight: 500; color: #e6f1ff; }
    .close-icon { color: #a8b2d1; }

    /* PDF */
    .pdf-wrapper { flex-grow: 1; background-color: #525659; /* Color neutro visor PDF */ position: relative; }
    iframe { border: none; width: 100%; height: 100%; display: block; }

    /* FOOTER / BOTONES */
    .modal-actions {
      padding: 15px 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex; justify-content: flex-end; gap: 15px;
      background-color: #112240;
    }

    /* ESTILO BOTÓN ABRIR (Azul Brillante) */
    .btn-open {
      text-decoration: none;
      display: flex; align-items: center; gap: 8px;
      padding: 8px 16px; border-radius: 5px;
      background-color: #3b82f6; 
      color: white;
      font-weight: 500; font-size: 0.9rem;
      transition: 0.3s;
    }
    .btn-open:hover { background-color: #2563eb; }
    .btn-open mat-icon { font-size: 18px; width: 18px; height: 18px; }

    /* ESTILO BOTÓN CERRAR (ROJO) */
    .btn-close {
      background-color: #ef4444 !important; 
      color: white !important;
      font-weight: 500;
    }
    .btn-close:hover { background-color: #dc2626 !important; }

    /* --- AJUSTES TEMA CLARO --- */
    
    :host-context(html.light-theme) .modal-container,
    :host-context(html.light-theme) .modal-actions {
      background-color: #ffffff; color: #333;
    }
    :host-context(html.light-theme) .modal-header h2 { color: #0a192f; }
    :host-context(html.light-theme) .modal-header,
    :host-context(html.light-theme) .modal-actions { border-color: #e2e8f0; }
  `]
})
export class CertificateDialogComponent {
  safeUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.link);
  }
}