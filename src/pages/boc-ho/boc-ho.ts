import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BocHoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-boc-ho',
  templateUrl: 'boc-ho.html',
})
export class BocHoPage {

  bh = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BocHoPage');
  }
  submitBocho(){
    console.log('submit BH');
  }

  save(){
    console.log(this.bh);
  }

}
