import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { GetJsonProvider } from '../../providers/get-json/get-json';
import { DetailPage } from '../detail/detail';
import { DbLoading } from '../dashboard/db-loading';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  root:any  ;
  public data;
  //test url
  // private url = "assets/user.json";
  constructor(private store: Storage,public navCtrl: NavController, public getj : GetJsonProvider) {
      this.store = store;
      let time = new Date();
      let timenow = time.getTime();
      this.store.get('API_Token').then(val=>{
        this.store.get('time-expire').then(vals=>{
          console.log('sksk');
          console.log(vals);
          console.log(timenow);
          console.log('sksk');
          if(val && (timenow < vals)){
            this.root = DbLoading;
            // this.root = LoginPage;
          }
          else {
            this.root = LoginPage;
          }
        })
      })
  }
  singOut(){
    this.navCtrl.push(DetailPage);
    // this.store.remove('API_Token');
    // this.navCtrl.push(LoginPage);
  }
}
