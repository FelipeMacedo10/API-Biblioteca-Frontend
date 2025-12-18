import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../services/carrinho-service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css']
})
export class Carrinho implements OnInit {
  itens: any[] = [];
  carregando = false;
  erro = '';
  usuario_id = Number(localStorage.getItem('usuario_id'));

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carregando = true;
    this.carrinhoService.obterCarrinho(this.usuario_id).subscribe({
      next: res => {
        this.itens = res;
        this.carregando = false;
      },
      error: err => {
        console.error('Erro ao carregar carrinho', err);
        this.erro = 'Não foi possível carregar o carrinho.';
        this.carregando = false;
      }
    });
  }

  remover(id: number): void {
    this.carrinhoService.removerDoCarrinho(id).subscribe({
      next: () => {
        // Atualiza a lista local removendo o item
        this.itens = this.itens.filter(item => item.id !== id);
      },
      error: err => {
        console.error('Erro ao remover item do carrinho', err);
        this.erro = 'Erro ao remover item do carrinho.';
      }
    });
  }
}