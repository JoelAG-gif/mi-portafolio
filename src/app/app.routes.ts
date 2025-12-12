import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ProjectsComponent } from './components/projects/projects';
import { SkillsComponent } from './components/skills/skills';
import { CertificatesComponent } from './components/certificates/certificates';
import { ContactComponent } from './components/contact/contact';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    pathMatch: 'full' 
  },
  { 
    path: 'proyectos', 
    component: ProjectsComponent 
  },
  { 
    path: 'habilidades', 
    component: SkillsComponent 
  },
  { 
    path: 'certificados', 
    component: CertificatesComponent 
  },
  { 
    path: 'contacto', 
    component: ContactComponent 
  },
  { 
    path: '**', 
    redirectTo: '',
    pathMatch: 'full'
  }
];