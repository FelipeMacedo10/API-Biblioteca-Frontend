import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = 'http://localhost:3000/livros';

  constructor(private http: HttpClient) { }

  obterLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  buscarLivros(q: string, autor?: string, genero?: string): Observable<Livro[]> {
    let url = `${this.apiUrl}/buscar?q=${q}`;
    if (autor) url += `&autor=${autor}`;
    if (genero) url += `&genero=${genero}`;
    return this.http.get<Livro[]>(url);
  }

  obterLivroPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  cadastrarLivro(livro: Livro): Observable<any> {
    return this.http.post(this.apiUrl, livro);
  }

  atualizarLivro(id: number, livro: Livro): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, livro);
  }

  excluirLivro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}