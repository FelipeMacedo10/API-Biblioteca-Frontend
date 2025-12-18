import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivroService } from '../services/livro-service';
import { Livro } from '../models/livro';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class Catalogo implements OnInit {
  livros: Livro[] = [];
  carregando = false;
  erro = '';

  constructor(private livroService: LivroService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregando = true;
    this.livroService.obterLivros().subscribe({
      next: res => {
        this.livros = res;
        this.carregando = false;
        this.cd.detectChanges();
      },
      error: err => {
        console.error('Erro ao carregar catálogo', err);
        this.erro = 'Não foi possível carregar o catálogo de livros.';
        this.carregando = false;
        this.cd.detectChanges();
      }
    });
  }
}