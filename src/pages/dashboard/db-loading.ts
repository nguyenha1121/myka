import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GetJsonProvider } from '../../providers/get-json/get-json';
import { DashboardPage } from './dashboard';

import { ServiceProvider } from '../../providers/service/service';
@Component({
  selector: 'page-db',
  templateUrl: 'db-loading.html',
})

export class DbLoading{
  public loading;
  public data;
  public tabs;
  constructor(public loadingCtrl: LoadingController,public store:Storage, public navCtrl: NavController,
    public navParams: NavParams, public getj: GetJsonProvider, public service: ServiceProvider) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait!'
    });
    // this.loading.present();


    this.store.get('log-in').then(val=>{
        this.data = val;
        this.service.setUser(val.username);
        // this.navCtrl.push(DashboardPage,{'log-in':this.data}).then(()=>{
        //
        // });
        this.navCtrl.setRoot(DashboardPage,{'log-in':this.data});
        // this.loading.dismiss();
      })
  }
  goToPage2() {
  }
}
