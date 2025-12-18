export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  tipo: TipoUsuario;
}

export enum TipoUsuario {
  USER = 'USER',
  ADMIN = 'ADMIN'
}