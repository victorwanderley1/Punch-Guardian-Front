import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.getIsAuthenticated()) {
      return true;
    } else {
      // Redirecione para a página de login se o usuário não estiver autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
