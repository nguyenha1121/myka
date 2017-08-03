import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
// $state;
  ionViewDidLoad() {
    // console.log('ionViewDidLoad DbHomePage');
  }

}
