import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetJsonProvider } from '../../../../providers/get-json/get-json';

/**
 * Generated class for the LendingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-lending',
  templateUrl: 'lending.html',
})
export class LendingPage {

  public data;
  private url = "assets/ex.json";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public getj: GetJsonProvider
  ) {
    // this.getj.load(this.url).then(data=>{
    //   this.data = data.data;
    //   console.log(this.data);
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LendingPage');
  }

}
