import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { GetJsonProvider } from '../../providers/get-json/get-json';
import { DetailPage } from '../detail/detail';
import { DbLoading } from '../dashboard/db-loading';

import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  root:any  ;
  public data;
  public list_br;
  //test url
  // private url = "assets/user.json";
  constructor(private store: Storage,public navCtrl: NavController,
    public getj : GetJsonProvider, public event: Events, public service: ServiceProvider) {
      this.store = store;
      let time = new Date();
      let timenow = time.getTime();
      this.event.subscribe('list-branch',(list_br=>{
        this.list_br = list_br;
        // console.log(this.list_br);
      }))
      this.store.get('API_Token').then(val=>{
        this.store.get('time-expire').then(vals=>{
          console.log(vals,"va",timenow);
          if(val && (timenow < vals)){
            this.store.get('list-branch').then(lb => {
              this.list_br = lb;
              console.log(lb);
              this.root = DbLoading;
              // this.root = LoginPage;
            });
          }
          else {
            this.root = LoginPage;
          }
        })
      })
  }
  singOut(){
    // this.navCtrl.push(DetailPage);
    this.store.remove('API_Token');
    this.navCtrl.setRoot(LoginPage);
  }
  changeBranch(br){
    this.store.set('branch', br.id).then(vale =>{
      console.log(vale);
      window.location.reload();
    });
  }
  setListBranch(lb){
    this.list_br = lb;
  }

}
