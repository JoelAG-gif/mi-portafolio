import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class SkillsComponent {
  
  technicalSkills = [
    { name: 'Angular', icon: 'angular.png' }, 
    { name: 'Python', icon: 'python.png' },
    { name: 'SQL Server', icon: 'sqlserver.png' }, 
    { name: 'PostgreSQL', icon: 'post.png' },
    { name: 'C#', icon: 'shar.png' },
    { name: 'Cisco Packet Tracer', icon: 'cisco.png' }, 
    { name: 'Power BI', icon: 'powerbi.png' }, 
    { name: 'Figma', icon: 'figma.png' },
    { name: 'Linux', icon: 'linux.png' }, 
  ];

  softSkills = [
    { name: 'Proactivo', icon: 'flash_on' },
    { name: 'Resolución de Problemas', icon: 'psychology' },
    { name: 'Trabajo en Equipo', icon: 'group' },
    { name: 'Liderazgo', icon: 'military_tech' },
    { name: 'Aprendizaje Continuo', icon: 'book' },
  ];
}