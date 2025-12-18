export interface Emprestimo {
  id: number;
  usuario_id: number;
  livro_id: number;
  data_inicio: string;
  data_fim: string;
  data_devolucao?: string;
  devolvido: boolean;
}