import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  private user = "";

  constructor(public http: Http) {

  }
  getUser(){
    return this.user;
  }

  setUser(user){
    this.user = user;
  }



}
