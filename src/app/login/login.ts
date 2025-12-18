// login.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  senha = '';
  erro = '';

  constructor(private router: Router) {}

  fazerLogin(): void {
    if (!this.email || !this.senha) {
      this.erro = 'Preencha email e senha.';
      return;
    }

    // Simulação de login: definir tipo e usuario_id coerentes
    localStorage.setItem('logado', 'true');
    localStorage.setItem('email', this.email);

    const isAdmin = this.email.toLowerCase().includes('admin');
    localStorage.setItem('tipo', isAdmin ? 'ADMIN' : 'USER');

    // Simula usuario_id armazenado para reserva (em produção: backend retorna)
    const simulatedUserId = isAdmin ? '100' : '1';
    localStorage.setItem('usuario_id', simulatedUserId);

    this.router.navigate(['/inicio']);
  }
}
