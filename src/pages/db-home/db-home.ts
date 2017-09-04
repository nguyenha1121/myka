import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { GetJsonProvider } from '../../providers/get-json/get-json';

import { LendingPage } from './sub-tabs/lending/lending';
import { NeedPage } from './sub-tabs/need/need';
import { TimeoutPage } from './sub-tabs/timeout/timeout';
import { SignUpPage } from './sub-tabs/sign-up/sign-up';

/**
 * Generated class for the DbHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-db-home',
  templateUrl: 'db-home.html',
})
export class DbHomePage {
  db_tab1: any = NeedPage;
  db_tab2: any = LendingPage;
  db_tab3: any = TimeoutPage;
  db_tab4: any = SignUpPage;
  public data;
  params: any  = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
      public store: Storage, public getj: GetJsonProvider,
      public menuCtrl: MenuController
  ) {
    // console.log('home');
    this.menuCtrl.enable(true,'usermenu');
    this.menuCtrl.enable(true,'db-menu');
    this.data = this.navParams.get('dashboard');
    console.log( this.data);
    this.params[0] = this.data.api_upcoming_list;
    this.params[1] = this.data.api_borrowing_list;
    this.params[2] = this.data.api_overdue_list;
    this.params[3] = this.data.api_completion;
  }
// $state;
  ionViewDidLoad() {
    // console.log('ionViewDidLoad DbHomePage');
  }

  openDbMenu(){
    // this.menuCtrl.enable(false,'usermenu');
    // this.menuCtrl.enable(true,'dbmenu');
    this.menuCtrl.toggle();
  }


}
