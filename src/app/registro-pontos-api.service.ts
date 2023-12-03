import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { RegistroPonto } from './registro-pontos/registro-ponto.interface';
import { EspelhoPonto } from './registro-pontos/espelho-ponto/espelho-ponto.interface';
import { environment } from 'src/environments/environment';


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

  public baterPonto(){
    return this.httpClient.post(this.SERVER_URL+this.idProfissional, '');
  }
}
