import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  senha = '';
  erro = '';
  carregando = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  login(): void {
    this.erro = '';
    this.carregando = true;

    // Verificação básica
    if (!this.email || !this.senha) {
      this.erro = 'Preencha todos os campos.';
      this.carregando = false;
      return;
    }

    // Chamar serviço de login
    this.usuarioService.login(this.email, this.senha).subscribe({
      next: (usuario) => {
        this.carregando = false;

        // Salvar informações no localStorage
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('logado', 'true');
        localStorage.setItem('tipo', usuario.tipo);
        // Só salva se o id for válido
        if (usuario.id !== undefined && usuario.id !== null) {
          localStorage.setItem('usuario_id', usuario.id.toString());
        }


        // Redirecionar conforme o tipo de usuário
        if (usuario.tipo === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/inicio']);
        }
      },
      error: (err) => {
        this.carregando = false;
        console.error('Erro no login:', err);

        if (err === 'Credenciais inválidas') {
          this.erro = 'Email ou senha incorretos.';
        } else {
          this.erro = 'Erro ao fazer login. Tente novamente.';
        }
      }
    });
  }

  cadastrar(): void {
    this.router.navigate(['/cadastro']);
  }
}