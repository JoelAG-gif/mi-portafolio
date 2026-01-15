import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects'; 

describe('ProjectsComponent', () => { 

  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    // 1. Configuración del Módulo de Pruebas
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent] 
    })
    .compileComponents();
    
    // 2. Inicialización del Componente 
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable(); 
  });

  // 3. Los tests se ejecutan aquí
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
