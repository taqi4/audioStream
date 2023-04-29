import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAudioComponent } from './add-audio/add-audio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },{
    path : 'register',
    component : RegisterComponent
  },{
    path : 'add-audio',
    component : AddAudioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
