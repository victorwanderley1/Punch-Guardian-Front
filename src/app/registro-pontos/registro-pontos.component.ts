import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistroPontosApiService } from "../registro-pontos-api.service";
import { RegistroPonto } from './registro-ponto.interface';
import { EspelhoPonto } from './espelho-ponto/espelho-ponto.interface';
import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';


@Component({
  selector: 'app-registro-pontos',
  templateUrl: './registro-pontos.component.html',
  styleUrls: ['./registro-pontos.component.css'],
  providers: [
  ]
})
export class RegistroPontosComponent {
  range = new FormGroup({
    dtInicio: new FormControl<Date | null>(null),
    dtFim: new FormControl<Date | null>(null),
  });
  pontos: RegistroPonto[] = [];
  pontoPrincipal: any = {};
  mensagem: string = '';
  espelhoPonto!: EspelhoPonto;
  columnsToDisplay = ['data', 'entrada1', 'saida1', 'entrada2', 'saida2', 'totalHoras'];
  timeString: string = '00:00:00';
  constructor(private registroService: RegistroPontosApiService){ }
  ngOnInit(){
    this.updateTime(); // Chama a função para exibir o horário inicialmente
    setInterval(() => this.updateTime(), 1000); // Atualiza a cada segundo
  }

  buscarPontos(){
    this.registroService.get().subscribe((data: RegistroPonto[])=>{
      console.log(data);
      this.pontoPrincipal = data[0]
      this.pontos = data;
    });
  }

  buscaEspelhoPonto(){
    this.registroService.getEspelhoPonto().subscribe((data: EspelhoPonto) =>{
      console.log(data);
      this.espelhoPonto = data;
    })
  }

  baterPonto(){
    this.registroService.baterPonto().subscribe((mensagem: any)=>{
      console.log(mensagem);
      this.mensagem = mensagem.mensagemRetorno;
      // this.buscaEspelhoPonto();
    });
  }

  getDatas(pontos: any): string[] {
    return Object.keys(pontos).sort();
  }

  updateTime() {
    const now = new Date();
    const hours = this.padNumber(now.getHours());
    const minutes = this.padNumber(now.getMinutes());
    const seconds = this.padNumber(now.getSeconds());
    this.timeString = `${hours}:${minutes}:${seconds}`;
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
  
};


