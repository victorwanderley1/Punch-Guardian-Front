import { Component } from '@angular/core';
import { RegistroPontosApiService } from "../registro-pontos-api.service";
import { RegistroPonto } from './registro-ponto.interface';
import { EspelhoPonto } from './espelho-ponto/espelho-ponto.interface';

@Component({
  selector: 'app-registro-pontos',
  templateUrl: './registro-pontos.component.html',
  styleUrls: ['./registro-pontos.component.css']
})
export class RegistroPontosComponent {
  pontos: RegistroPonto[] = [];
  pontoPrincipal: any = {};
  mensagem: string = '';
  espelhoPonto!: EspelhoPonto;
  columnsToDisplay = ['data', 'entrada1', 'saida1', 'entrada2', 'saida2', 'totalHoras'];
  constructor(private registroService: RegistroPontosApiService){ }
  ngOnInit(){
    
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
      this.buscaEspelhoPonto();
    });
  }

  getDatas(pontos: any): string[] {
    return Object.keys(pontos).sort();
  }

}
