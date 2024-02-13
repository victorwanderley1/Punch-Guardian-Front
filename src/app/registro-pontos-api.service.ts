import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { RegistroPonto } from './registro-pontos/registro-ponto.interface';
import { EspelhoPonto, Ponto } from './registro-pontos/espelho-ponto/espelho-ponto.interface';
import { environment } from 'src/environments/environment';
import { RegistroPontoRetroativo } from './registro-pontos/retroativo/registro-ponto-retroativo.interface';


@Injectable({
  providedIn: 'root'
})
export class RegistroPontosApiService {

  //private SERVER_URL = "http://localhost:8080/ponto/";
  private SERVER_URL = environment.URL_API+"/ponto/";
  private idProfissional = 1;
  constructor(private httpClient: HttpClient) { }

  public get(){
    var retorno = this.httpClient.get<RegistroPonto[]>(this.SERVER_URL+this.idProfissional);
    return retorno;
  }

  public getEspelhoPonto(){
    var retorno = this.httpClient.get<EspelhoPonto>(this.SERVER_URL+this.idProfissional);
    return retorno;
  }

  public getEspelhoPontoPeriodo(id: number, dataInicio: any, dataFim: any){
    var params = new HttpParams().set('idProfissional', id.toString())
      .set("dataInicio", dataInicio)
      .set("dataFim", dataFim);
    var options = {params: params};

    var retornoAPI = this.httpClient.get<EspelhoPonto>(this.SERVER_URL+'periodo', options)
    return retornoAPI;
  }

  public buscarPonto(idProfissional: number, idPonto: number){
    var retornoAPI = this.httpClient.get<RegistroPonto>(this.SERVER_URL+idProfissional+'/'+idPonto);
    return retornoAPI;
  }

  public baterPonto(){
    return this.httpClient.post(this.SERVER_URL+this.idProfissional, '');
  }

  public baterPontoRetroativo(idProfissional: number, tipoPonto: number, hora: any){
    var body = {tipoPonto, hora};
    
    return this.httpClient.post(this.SERVER_URL+'retroativo/'+idProfissional, body);
  }

  public atualizarPonto(idProfissional: number, id: number, tipoPonto: number, hora: any){
    const correcao = true;
    var body = {id, tipoPonto, hora, correcao};
    
    return this.httpClient.put(this.SERVER_URL+idProfissional, body);
  }
}
