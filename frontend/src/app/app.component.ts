import { Component } from '@angular/core';
import { ContextService } from './context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private context :ContextService){

  }
  public localStorage = localStorage;
  title = 'frontend';
  userInfo:any;
  ngOnInit() {
    this.context.getUserInfo().subscribe(res=>{
      if(res){
        this.userInfo = res;
      }else{
        this.userInfo = { name : "User"}
      }
    })
  }
}
