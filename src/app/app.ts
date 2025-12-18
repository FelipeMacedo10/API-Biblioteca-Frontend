import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  anoAtual = new Date().getFullYear();

  isLoggedIn(): boolean {
    return localStorage.getItem('logado') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('tipo') === 'ADMIN';
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}