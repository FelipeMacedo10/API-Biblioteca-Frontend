// detalhes-livro.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Livro } from '../models/livro';
import { LivroService } from '../services/livro-service';
import { ReservaService } from '../services/reserva-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detalhes-livro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detalhes-livro.html',
  styleUrls: ['./detalhes-livro.css']
})
export class DetalhesLivro implements OnInit {
  livro: Livro | null = null;
  formReserva: FormGroup;
  mensagemSucesso = '';
  carregando = false;
  erro = '';
  usuarioLogado = false;

  constructor(
    private livroService: LivroService,
    private reservaService: ReservaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.formReserva = this.fb.group({
      data_retirada: ['', [Validators.required, this.validarDataNaoPassada]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID recebido da rota:', idParam);
    if (!idParam || isNaN(Number(idParam))) {
      this.erro = 'Livro não encontrado.';
      return;
    }

    const id = Number(idParam);

    this.carregando = true;

    this.usuarioLogado = localStorage.getItem('logado') === 'true';
    this.livroService.obterLivroPorId(id).subscribe({
      next: res => { this.livro = res; this.carregando = false; this.cd.detectChanges(); },
      error: err => {
        console.error('Erro ao carregar livro', err);
        this.erro = 'Não foi possível carregar o livro.';
        this.carregando = false;
        this.cd.detectChanges();
      }
    });
  }

  fazerReserva(): void {
    if (!this.livro || this.formReserva.invalid) return;

    if (!this.livro.disponivel) { this.erro = 'Este livro já está reservado e indisponível.'; return; }

    const usuarioIdStr = localStorage.getItem('usuario_id');
    const usuario_id = usuarioIdStr ? Number(usuarioIdStr) : null;

    if (!this.usuarioLogado || usuario_id === null) {
      this.erro = 'Você precisa estar logado para reservar.';
      return;
    }


    const reserva = {
      id: 0,
      usuario_id,
      livro_id: this.livro.id,
      data_retirada: this.formReserva.value.data_retirada
    };

    this.reservaService.criarReserva(reserva).subscribe({
      next: () => {
        this.mensagemSucesso = 'Reserva criada com sucesso!';
        this.livro = { ...this.livro!, disponivel: false };
      },
      error: err => {
        console.error('Erro ao criar reserva', err);
        this.erro = 'Não foi possível criar a reserva. Tente novamente.';
      }
    });
  }

  private validarDataNaoPassada = (control: any) => {
    const value = control.value;
    if (!value) return null;
    const hoje = new Date();
    const data = new Date(value);
    // zera horas para comparar só a data
    hoje.setHours(0, 0, 0, 0);
    if (data < hoje) return { dataPassada: true };
    return null;
  };
}