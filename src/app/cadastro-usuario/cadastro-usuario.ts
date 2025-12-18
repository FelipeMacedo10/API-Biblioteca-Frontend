import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario-service';
import { Router, RouterModule } from '@angular/router';
import { TipoUsuario } from '../models/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro-usuario.html',
  styleUrls: ['./cadastro-usuario.css']
})
export class CadastroUsuario {
  nome = '';
  email = '';
  senha = '';
  mensagemSucesso = '';
  erro = '';
  currentYear = new Date().getFullYear();

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  cadastrar(): void {
    // Limpar mensagens anteriores
    this.mensagemSucesso = '';
    this.erro = '';

    // Validações
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

    // Criar objeto de usuário conforme a API espera
    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipo: TipoUsuario.USER  // Por padrão, novos usuários são do tipo USER
    };

    // Chamar o serviço para cadastrar
    this.usuarioService.cadastrarUsuario(usuario).subscribe({
      next: (resposta) => {
        console.log('Resposta da API:', resposta);
        this.mensagemSucesso = 'Usuário cadastrado com sucesso!';
        
        // Limpar campos
        this.nome = '';
        this.email = '';
        this.senha = '';
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erro ao cadastrar usuário', err);
        
        // Verificar tipo de erro
        if (err.status === 0) {
          this.erro = 'Erro de conexão. Verifique se o servidor está rodando.';
        } else if (err.status === 400) {
          this.erro = 'Dados inválidos. Verifique os campos.';
        } else if (err.status === 409) {
          this.erro = 'Email já cadastrado.';
        } else {
          this.erro = 'Não foi possível cadastrar. Tente novamente.';
        }
      }
    });
  }
}