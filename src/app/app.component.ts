import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'punch-guardian';
  isLoggedIn: boolean = false;
  constructor(private loginService: LoginService){
  }

  ngOnInit() {
    this.loginService.isLoggedIn$().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout(){
    this.loginService.logout();
  }
}
