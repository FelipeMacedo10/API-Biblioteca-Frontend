export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  descricao?: string;
  disponivel: boolean;
}