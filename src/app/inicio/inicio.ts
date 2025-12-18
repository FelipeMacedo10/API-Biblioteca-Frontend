// inicio.ts
import { Component, OnInit } from '@angular/core';
import { Livro } from '../models/livro';
import { LivroService } from '../services/livro-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit {
  livros: Livro[] = [];
  totalLivros = 0;
  carregando = false;
  erro = '';

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.carregando = true;
    this.livroService.obterLivros().subscribe({
      next: res => {
        this.livros = res;
        this.totalLivros = res.length;
        this.carregando = false;
      },
      error: err => {
        console.error('Erro ao carregar livros', err);
        this.erro = 'Não foi possível carregar os livros. Tente novamente mais tarde.';
        this.carregando = false;
      }
    });
  }
}