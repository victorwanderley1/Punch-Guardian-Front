import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { RegistroPonto } from './registro-pontos/registro-ponto.interface';


@Injectable({
  providedIn: 'root'
})
export class RegistroPontosApiService {

  private SERVER_URL = "http://serverhome.local:8080/ponto/";

  constructor(private httpClient: HttpClient) { }

  public get(){
    var retorno = this.httpClient.get<RegistroPonto[]>(this.SERVER_URL+'1');
    return retorno;
  }

  public baterPonto(){
    return this.httpClient.post(this.SERVER_URL+'1', '');
  }
}
