import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-trade',
  templateUrl: 'trade.html',
})
export class TradePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modal : ModalController) {
  }
  trade = {};
  summaryDate: any = new Date().toISOString();
  ionViewDidLoad() {
    console.log('ionViewDidLoad TradePage');
  }
  search(){
    console.log(this.trade);
    console.log(this.summaryDate);
  };
  openCalendar(){
    console.log('modal');

  }

  onChangehere(ev){
    console.log(this.summaryDate);
  }
}
