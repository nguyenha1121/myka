import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GetJsonProvider } from '../../providers/get-json/get-json';
import { DbHomePage } from './db-home';

@Component({
  selector: 'db-loading',
  templateUrl: 'db-loading.html',
})

export class DbHomeLoading{
  public loading;
  public data;
  public tabs;
  constructor(public loadingCtrl: LoadingController,public store:Storage, public navCtrl: NavController, public navParams: NavParams, public getj: GetJsonProvider) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait!'
    });
    this.loading.present();


    this.store = store;
    this.getj = getj;
    // http://app.onbank.vn/api/loan/list
    this.store.get('API_Token').then(token =>{
      this.store.get('branch').then(br=>{
        this.getj.load('http://app.onbank.vn/api/loan/list?API_TOKEN='+token+'&branch='+br, '').then(data=>{
          this.data = data.data;
          console.log(data);
          this.navCtrl.push(DbHomePage,{'dashboard' :this.data});
          this.loading.dismiss();
        });
      })

    });

    // this.store.get('log-in').then(val=>{
    //     this.data = val;
    //     this.navCtrl.push(DbHomePage,{'log-in':this.data});
    //     this.loading.dismiss();
    //   })
  }
  goToPage2() {


    // setTimeout(() => {
    //   this.navCtrl.push(DashboardPage);
    // }, 1000);
    //
    // setTimeout(() => {
    //   this.loading.dismiss();
    // }, 4000);
  }
}
