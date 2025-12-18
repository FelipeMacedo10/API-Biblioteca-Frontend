export interface Reserva {
  id: number;
  usuario_id: number;
  livro_id: number;
  data_retirada: string;
  data_devolucao?: string;
}