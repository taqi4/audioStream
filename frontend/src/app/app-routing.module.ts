import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAudioComponent } from './add-audio/add-audio.component';
import { ListAudioComponent } from './list-audio/list-audio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo : 'list-audio'
  },
  {
    path : 'login',
    component : LoginComponent
  },{
    path : 'register',
    component : RegisterComponent
  },{
    path : 'add-audio',
    component : AddAudioComponent
  },{
    path : 'list-audio',
    component : ListAudioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
