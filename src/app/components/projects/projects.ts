import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Interfaz para tipar los proyectos
interface Project {
  name: string;
  description: string;
  tech: string[];
  image: string;
  repoLink: string;
  demoLink?: string; // Opcional - Video de demostración
  webLink?: string;  // Opcional - Página web funcional
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent {
  projects = [
    {
      name: 'Dashboard de Análisis de Ventas (Retail)',
      description: 'Tablero interactivo para el análisis de rendimiento comercial y cumplimiento presupuestario. Permite identificar KPIs clave, comparar tiendas y detectar productos críticos mediante un modelo de datos robusto y cálculos DAX avanzados.',
      tech: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
      image: 'assets/ventas x tienda.png', 
      repoLink: 'https://github.com/JoelAG-gif/Analisis-Ventas-PowerBI',
    },
    {
      name: 'Cyberpunk Features UI',
      description: 'Componente de interfaz moderna con estética Cyberpunk. Incluye animaciones CSS avanzadas (scan-lines, efectos neon), diseño Grid responsivo y tipografías futuristas. Demuestra dominio en estilización y UX visual.',
      tech: ['Angular', 'CSS3 Avanzado', 'Keyframe Animations', 'Responsive Design'],
      image: 'assets/Cyberpunk.png', 
      repoLink: 'https://github.com/JoelAG-gif/cyberpunk-ui.git', 
      demoLink: 'https://drive.google.com/file/d/1pMhSbItB_APaHT4vBXWfTzSk-i9fGa3V/view?usp=sharing',
      webLink: 'https://cyberpunk-ui-six.vercel.app/'
    },
    {
      name: 'App Móvil - Extintores Romero',
      description: 'Sistema integral con 3 roles (Admin, Técnico, Cliente). Permite la compra de extintores, gestión de inventario, solicitud y seguimiento de mantenimiento (flujo de estados), y alertas automáticas de vencimiento.',
      tech: ['Android (Java)', 'PHP', 'MySQL', 'Volley', 'Material Design'],
      image: 'assets/appmovil.png', 
      repoLink: 'https://github.com/JoelAG-gif/App-Extintores-Romero',
      demoLink: 'https://drive.google.com/file/d/1xybv6MSLWf7iS80w5ca8MGPkGPYVXFwW/view?usp=sharing' 
    },
  ];
}