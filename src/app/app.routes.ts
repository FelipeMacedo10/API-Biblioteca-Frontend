import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Catalogo } from './catalogo/catalogo';
import { Login } from './login/login';
import { CadastroUsuario } from './cadastro-usuario/cadastro-usuario';
import { DetalhesLivro } from './detalhes-livro/detalhes-livro';
import { Admin } from './admin/admin';
import { Carrinho } from './carrinho/carrinho';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'catalogo', component: Catalogo },
  { path: 'login', component: Login },
  { path: 'cadastro-usuario', component: CadastroUsuario },
  { path: 'livro/:id', component: DetalhesLivro },
  { path: 'admin', component: Admin },
  { path: 'carrinho', component: Carrinho }

];
