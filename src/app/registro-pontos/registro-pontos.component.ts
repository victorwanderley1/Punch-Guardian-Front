import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistroPontosApiService } from "../registro-pontos-api.service";
import { RegistroPonto } from './registro-ponto.interface';
import { EspelhoPonto } from './espelho-ponto/espelho-ponto.interface';
import * as moment from 'moment';



@Component({
  selector: 'app-registro-pontos',
  templateUrl: './registro-pontos.component.html',
  styleUrls: ['./registro-pontos.component.css'],
  providers: [
  ]
})
export class RegistroPontosComponent {
  range = new FormGroup({
    dtInicio: new FormControl<string | null>(null),
    dtFim: new FormControl<string | null>(null),
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
      this.registroService.get().subscribe((data: RegistroPonto[]) => {
        console.log(data);
        this.pontoPrincipal = data[0]
        this.pontos = data;
      });
  }

  buscarPontosPeriodo(){
    let novaData: moment.Moment = moment.utc(this.range.value.dtInicio).local();
    this.range.value.dtInicio = novaData.format("YYYY-MM-DD");
    novaData = moment.utc(this.range.value.dtFim).local();
    this.range.value.dtFim = novaData.format("YYYY-MM-DD");

    this.registroService.getEspelhoPontoPeriodo(1, this.range.value.dtInicio, this.range.value.dtFim)
      .subscribe((retorno: EspelhoPonto) =>{
        this.espelhoPonto = retorno;
      })
  }

  buscaEspelhoPonto(){
    if ((this.range.value.dtInicio != 'Invalid date' && this.range.value.dtFim != 'Invalid date')
    && (this.range.value.dtInicio != null && this.range.value.dtFim != null)) {
      this.buscarPontosPeriodo();
    } else {
      this.registroService.getEspelhoPonto().subscribe((data: EspelhoPonto) => {
        this.espelhoPonto = data;
      })
    }
    this.range.reset();
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


