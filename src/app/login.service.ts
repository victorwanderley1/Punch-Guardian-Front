import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated: boolean = false;

  private SERVER_URL = environment.URL_API+"/auth";
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  
  //private SERVER_URL = "http://localhost:8080/auth/";
  constructor(private httpClient: HttpClient, private router: Router){}

  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public async logar(username: any, senha: any): Promise<void> {
    const body = { username, senha };

    try {
      const retornoAPI: any = await this.httpClient.post(this.SERVER_URL + '/login', body).toPromise();
      
      if (retornoAPI.token) {
        localStorage.setItem('token', retornoAPI.token);
        this.isAuthenticated = true;
        this.isLoggedInSubject.next(true);
        this.router.navigate(["/registro-pontos"]);
      } else {
        throw new Error('A resposta da API não contém um token.');
      }
    } catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          const errorMessage = error.error.message;
          console.error(errorMessage);
          throw new Error(errorMessage);
        } else {
          console.error('Erro inesperado:', error);
          throw new Error('Erro inesperado. Por favor, tente novamente.');
        }
      } else {
        console.error('Erro desconhecido:', error);
        throw new Error('Erro desconhecido. Por favor, tente novamente.');
      }
    }
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
    this.isLoggedInSubject.next(false);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
