import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  public userInfo = new BehaviorSubject(null);
  constructor() { }
  getUserInfo(){
    return this.userInfo.asObservable();
  }
}
