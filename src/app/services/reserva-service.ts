import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/reservas';

  constructor(private http: HttpClient) { }

  obterReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  obterReservasPorUsuario(usuario_id: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${usuario_id}`);
  }

  criarReserva(reserva: Reserva): Observable<any> {
    return this.http.post(this.apiUrl, reserva);
  }
}