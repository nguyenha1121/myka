import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CamDoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cam-do',
  templateUrl: 'cam-do.html',
})
export class CamDoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  cd = {};

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CamDoPage');
  }

}
