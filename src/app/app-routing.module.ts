import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegistroPontosComponent } from './registro-pontos/registro-pontos.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'registro-pontos', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'registro-pontos', component: RegistroPontosComponent, canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
