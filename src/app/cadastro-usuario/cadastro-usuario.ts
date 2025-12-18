import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario-service';
import { Router } from '@angular/router';
import { TipoUsuario } from '../models/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro-usuario.html',
  styleUrls: ['./cadastro-usuario.css']
})
export class CadastroUsuario {
  nome = '';
  email = '';
  senha = '';
  mensagemSucesso = '';
  erro = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  cadastrar(): void {
    if (!this.nome || !this.email || !this.senha) {
      this.erro = 'Preencha todos os campos.';
      return;
    }
    if (!this.email.includes('@')) {
      this.erro = 'Email inválido.';
      return;
    }
    if (this.senha.length < 6) {
      this.erro = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    const usuario = {
      id: 0,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipo: TipoUsuario.USER
    };

    this.usuarioService.cadastrarUsuario(usuario).subscribe({
      next: () => {
        this.mensagemSucesso = 'Usuário cadastrado com sucesso!';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: err => {
        console.error('Erro ao cadastrar usuário', err);
        this.erro = 'Não foi possível cadastrar. Tente novamente.';
      }
    });
  }
}
