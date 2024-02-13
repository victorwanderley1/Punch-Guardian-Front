import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegistroPontosComponent } from './registro-pontos/registro-pontos.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';
import { RetroativoComponent } from './registro-pontos/retroativo/retroativo.component';

const routes: Routes = [
  { path: '', redirectTo: 'registro-pontos', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'registro-pontos', component: RegistroPontosComponent, canActivate: [LoginGuard]},
  { path: 'registro-pontos/retroativo', component: RetroativoComponent, canActivate: [LoginGuard]},
  { path: 'registro-pontos/retroativo/:id', component: RetroativoComponent, canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
