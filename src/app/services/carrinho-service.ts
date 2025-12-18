import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private apiUrl = 'http://localhost:3000/carrinho';

  constructor(private http: HttpClient) {}

  obterCarrinho(usuario_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuario_id}`);
  }

  adicionarAoCarrinho(usuario_id: number, livro_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { usuario_id, livro_id });
  }

  removerDoCarrinho(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}