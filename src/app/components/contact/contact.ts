import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatProgressSpinnerModule
  ],
  templateUrl: './contact.html', 
  styleUrls: ['./contact.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup; 
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  
  // ¡RECUERDA CAMBIAR ESTA URL! 
  private apiUrl = 'http://localhost:8000/api/contacto/enviar'; 

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); 
      return;
    }

    this.status = 'loading';
    const data = this.contactForm.value;

    this.http.post(this.apiUrl, data).subscribe({
      next: (response) => {
        this.status = 'success';
        this.contactForm.reset(); 
        alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
      },
      error: (err) => {
        this.status = 'error';
        console.error('Error al enviar el formulario:', err);
        alert('Hubo un error al enviar el mensaje. Asegúrate que la API de Python esté corriendo.');
      }
    });
  }
}