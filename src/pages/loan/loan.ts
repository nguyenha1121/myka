import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CamDoPage } from '../cam-do/cam-do';
import { BocHoPage } from '../boc-ho/boc-ho';

/**
 * Generated class for the LoanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-loan',
  templateUrl: 'loan.html',
})
export class LoanPage {

  camdo:any = CamDoPage;
  bocho:any = BocHoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanPage');
  }

}
