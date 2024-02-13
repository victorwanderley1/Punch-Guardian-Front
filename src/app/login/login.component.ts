import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  mensagem: string = '';
  dados = new FormGroup({
    username: new FormControl<string | null>(null),
    senha: new FormControl<string | null>(null),
  });

  constructor(private loginService: LoginService){}

  async logar() {
    try {
      const token = await this.loginService.logar(this.dados.value.username, this.dados.value.senha);
      
    } catch (error: any) {
      this.mensagem = error.message;
    }
  }

}
