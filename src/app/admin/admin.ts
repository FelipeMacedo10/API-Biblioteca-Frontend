import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Livro } from '../models/livro';
import { Usuario } from '../models/usuario';
import { LivroService } from '../services/livro-service';
import { UsuarioService } from '../services/usuario-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {
  livros: Livro[] = [];
  usuarios: Usuario[] = [];
  mensagemSucesso = '';
  erro = '';

  novoLivro: Livro = {
    id: 0,
    titulo: '',
    autor: '',
    genero: '',
    disponivel: true
  };

  constructor(
    private livroService: LivroService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.carregarLivros();
    this.carregarUsuarios();
  }

  carregarLivros(): void {
    this.livroService.obterLivros().subscribe({
      next: (res: Livro[]) => this.livros = res,
      error: (err: any) => {
        console.error('Erro ao carregar livros', err);
        this.erro = 'Não foi possível carregar os livros.';
      }
    });
  }

  carregarUsuarios(): void {
    this.usuarioService.obterUsuarios().subscribe({
      next: (res: Usuario[]) => this.usuarios = res,
      error: (err: any) => {
        console.error('Erro ao carregar usuários', err);
        this.erro = 'Não foi possível carregar os usuários.';
      }
    });
  }

  adicionarLivro(): void {
    this.livroService.cadastrarLivro(this.novoLivro).subscribe({
      next: () => {
        this.mensagemSucesso = 'Livro cadastrado com sucesso!';
        this.carregarLivros();
        this.novoLivro = { id: 0, titulo: '', autor: '', genero: '', disponivel: true };
      },
      error: (err: any) => {
        console.error('Erro ao cadastrar livro', err);
        this.erro = 'Não foi possível cadastrar o livro.';
      }
    });
  }

  excluirLivro(id: number): void {
    this.livroService.excluirLivro(id).subscribe({
      next: () => this.carregarLivros(),
      error: (err: any) => {
        console.error('Erro ao excluir livro', err);
        this.erro = 'Não foi possível excluir o livro.';
      }
    });
  }

  excluirUsuario(id: number | undefined): void {

    if (!id) {
      console.error('ID do usuário não encontrado');
      alert('Não foi possível excluir: ID do usuário não encontrado');
      return;
    } else {
      this.usuarioService.excluirUsuario(id).subscribe({
        next: () => this.carregarUsuarios(),
        error: (err: any) => {
          console.error('Erro ao excluir usuário', err);
          this.erro = 'Não foi possível excluir o usuário.';
        }
      });
    }


  }
}
