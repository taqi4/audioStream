import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ContextService } from '../context.service';
import { Router } from '@angular/router';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  environment = environment;
  submitted = false;
  loginForm:any = FormGroup;
  constructor( private formBuilder: FormBuilder,private httpService :HttpClient,private context : ContextService,private router: Router,private popupService :PopupService){}
  //Add user form actions
  get f() { return this.loginForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.httpService.post(this.environment.baseUrl+"v1/auth/login",this.loginForm.value).subscribe((res:any)=>{
      if(res){
        const accessToken = res.tokens.access.token;
        this.context.userInfo.next(res.user);
        localStorage.setItem('token',accessToken);
        this.router.navigate(['']);
      }
    },err=>{
      this.popupService.showToast('error',err.error.message)

    })
    //True if all the fields are filled
    
   
  }
    ngOnInit() {
      //Add User form validations
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    }
  
}
