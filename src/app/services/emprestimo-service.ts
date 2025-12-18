import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private apiUrl = 'http://localhost:3000/emprestimos';

  constructor(private http: HttpClient) { }

  obterEmprestimosPorUsuario(usuario_id: number): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/usuario/${usuario_id}`);
  }

  criarEmprestimo(emprestimo: Emprestimo): Observable<any> {
    return this.http.post(this.apiUrl, emprestimo);
  }

  registrarDevolucao(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/devolver`, {});
  }
}