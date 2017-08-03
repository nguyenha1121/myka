import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';

import { GetJsonProvider } from '../../../../providers/get-json/get-json';
/**
 * Generated class for the NeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-need',
  templateUrl: 'need.html',
})
export class NeedPage {

  public data:any;
  private url = "http://thuviensofl.xyz/api/loan/list";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public getj: GetJsonProvider,
    public call: CallNumber,
    public store : Storage
  ) {
    // this.store.get('API_Token').then(token =>{
    //   this.getj.load(this.url, token).then(data=>{
    //     this.data = data.data.items;
    //     this.data = this.hack(this.data);
    //   });
    // });

    this.store.get('API_Token').then(token =>{
      this.getj.load('assets/need.json', token).then(data=>{
        this.data = data.data.items;
        // this.data = this.hack(this.data);
        // console.log(JSON.parse(this.data[0].khach_hang['tenkh']));
        // this.data = null;
      });
    });

  }

  toArray(string){
    return (JSON.parse(string));
  }

  hack(val) {
    var result = Object.keys(this.data).map(function(key) {
      return val[key];
    });
    return result;
  }

  clickedSMS(){
    console.log('heelo');
  }
  clickedThu(){
    console.log('heelo');
  }
  clickedCall(num){
    console.log(num);
    this.call.callNumber(num, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  //
  dateConvert(date){
    // date = '2017-07-27 00:00:00';
    var dt = new Date(date);
    return((dt.getMonth() + 1) + '/' + dt.getDate());
  }

  gotoDetail(kh){
    console.log(kh);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NeedPage');
  }

}
