import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { DetalhesLivro } from './detalhes-livro/detalhes-livro';
import { Login } from './login/login';
import { CadastroUsuario } from './cadastro-usuario/cadastro-usuario';
import { Admin } from './admin/admin';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'detalhes-livro', component: DetalhesLivro },
  { path: 'login', component: Login },
  { path: 'cadastro-usuario', component: CadastroUsuario },
  { path: 'admin', component: Admin }
];
