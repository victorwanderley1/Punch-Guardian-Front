import { Time } from "@angular/common";

export interface EspelhoPonto {
    profissional: Profissional;
    dias: DiaRegistro[];
}

export interface Profissional {
    nome: string;
    cargo: {
        id: number;
        nome: string;
        descricao: string;
    }
}

export interface Ponto {
    id: number;
    hora: string;
    tipoPonto: string;
  }

export interface DiaRegistro{
    data: Date;
    pontos: Ponto[];
    totalHorasRegistradas: Time
}