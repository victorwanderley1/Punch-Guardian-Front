import { Component } from '@angular/core';
import { RegistroPontosApiService } from "../registro-pontos-api.service";
import { RegistroPonto } from './registro-ponto.interface';

@Component({
  selector: 'app-registro-pontos',
  templateUrl: './registro-pontos.component.html',
  styleUrls: ['./registro-pontos.component.css']
})
export class RegistroPontosComponent {
  pontos: RegistroPonto[] = [];
  pontoPrincipal: any = {};
  mensagem: string = '';
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

  baterPonto(){
    this.registroService.baterPonto().subscribe((mensagem: any)=>{
      console.log(mensagem);
      this.mensagem = mensagem.mensagemRetorno;
      this.buscarPontos();
    });
  }
}
