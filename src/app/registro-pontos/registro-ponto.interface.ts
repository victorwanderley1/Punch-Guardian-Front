export interface RegistroPonto {
    id: number;
    hora: string;
    tipoPonto: string;
    profissional: {
      id: number;
      cargo: {
        id: number;
        nome: string;
        descricao: string;
      };
      cargaHorariaSemanal: number;
      pessoa: {
        id: number;
        nome: string;
        dataNascimento: string;
        endereco: string;
        cpf: string;
        email: string;
      };
    };
  }
  