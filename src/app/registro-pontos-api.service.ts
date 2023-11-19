import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegistroPonto } from './registro-pontos/registro-ponto.interface';
import { EspelhoPonto } from './registro-pontos/espelho-ponto/espelho-ponto.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroPontosApiService {

  //private SERVER_URL = "http://serverhome.local:8080/ponto/";
  private SERVER_URL = environment.URL_API +"/ponto/";

  constructor(private httpClient: HttpClient) { }

  public get(){
    var retorno = this.httpClient.get<RegistroPonto[]>(this.SERVER_URL+'1');
    return retorno;
  }

  public getEspelhoPonto(){
    var retorno = this.httpClient.get<EspelhoPonto>(this.SERVER_URL+'1');
    return retorno;
  }

  public baterPonto(){
    return this.httpClient.post(this.SERVER_URL+'1', '');
  }
}
