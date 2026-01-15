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
  demoLink?: string; 
  webLink?: string;  
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
      demoLink: 'https://drive.google.com/file/d/1f0ywkD6xU-9I4xeJ8Nc7twv-Icixaxb0/view?usp=sharing',
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
    {
      name: 'AESI - Diseño UI/UX E-commerce',
      description: 'Sistema de diseño completo para una plataforma dual: Tienda online para clientes y Panel Administrativo (CMS) para gestión de inventario. Enfocado en la usabilidad, flujos de compra claros y una interfaz administrativa eficiente.',
      tech: ['Figma', 'UI/UX Design', 'Prototyping', 'Wireframing'],
      image: 'assets/darshboard del administrador.png', 
      repoLink: 'https://github.com/JoelAG-gif/UI-Design.git',
      demoLink: 'https://www.figma.com/design/0BNJuNviTBVZyqapx9e3h9/AESI-Plataforma-de-Ecommerce?node-id=0-1&t=1wHye7tjWcEjJuoP-1' 
    },
    {
      name: 'AESI - Bolsa de Empleo Inclusiva',
      description: 'Plataforma de reclutamiento diseñada con enfoque en la inclusión laboral. Interfaz accesible que conecta talento diverso con empresas, facilitando procesos de selección equitativos. Incluye flujos completos para Candidatos y Reclutadores.',
      tech: ['Figma', 'UI/UX', 'Prototyping', 'User Flows'],
      image: 'assets/inicio.png', 
      repoLink: 'https://github.com/JoelAG-gif/Bolsa-Empleo',
      demoLink: 'https://www.figma.com/design/v8Bj39tsTIkHu0J3lDEGeA/AESI-Plataforma-de-postulaci%C3%B3n-de-empleo-web-inclusiva.?node-id=0-1&t=fQg1S9YDjvFf1lmW-1' 
    },
  ];
}