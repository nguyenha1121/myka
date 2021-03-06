import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';

import { GetJsonProvider } from '../../../../providers/get-json/get-json';
import { ThulaiModal } from '../thulai-modal/thulai-modal';
import { DbModal } from '../db-modal/db-modal';

// import { NumP } from '../../../../include/numprocess';
/**
 * Generated class for the NeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
   selector: 'page-timeout',
   templateUrl: 'timeout.html',
 })
export class TimeoutPage {

  public data:any;
  public param;
  public list_empty;
  private url = "http://thuviensofl.xyz/api/loan/list";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public getj: GetJsonProvider,
    public call: CallNumber,
    public store : Storage,
    public modal: ModalController,
  ) {
    console.log(this.navParams.data);
    this.modal = modal;
    // this.store.get('API_Token').then(token =>{
    //   this.getj.load(this.url, token).then(data=>{
    //     this.data = data.data.items;
    //     this.data = this.hack(this.data);
    //   });
    // });
    /////// GET DATA LIKE PARAMS
    if(this.isEmpty(this.navParams.data )){
      console.log('khong anh');
      this.list_empty = true;
    } else {console.log(this.navParams.data);  console.log('co anh');}
    this.data = [];
    // this.list_empty = true;
    // console.log(this.navParams.data[14]);
    var x =(Object.keys(this.navParams.data));
    if(x.length == 0){
      this.list_empty = true;
    }
    for (let t = 0;t<x.length;t++){
      this.data.push(this.navParams.data[x[t]]);
    }
    // this.store.get('API_Token').then(token =>{
    //   this.getj.load('assets/need.json', token).then(data=>{
    //     // this.data = data.data.items;
    //     console.log(this.data);
    //     // this.data = this.hack(this.data);
    //     // console.log(JSON.parse(this.data[0].khach_hang['tenkh']));
    //     // this.data = null;
    //   });
    // });

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
  clickedThu(kh){
    let modal = this.modal.create(ThulaiModal,{'param':kh});
    modal.present();

  }
  clickedCall(num){
    console.log(num);
    this.call.callNumber(num, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  //
  dateConvert(date){
    var dt = new Date(date);
    return((dt.getMonth() + 1) + '/' + dt.getDate());
  }

  gotoDetail(kh){
    console.log(kh);
    let myModal = this.modal.create(DbModal,{'param':kh});
    myModal.present();
  }

  ionViewDidLoad() {
  }



  dq(n,a){
    if(n <=0){
      return a;
    } else {
      let d = this.dq(Math.floor(n/1000),a);
      if(n%1000 > 99){
        a += String(n%1000);
      } else if(n%1000 > 9){
        a += '0';
        a += n%1000;
      } else {
        a += '00';
        a += n%1000;
      }
      return d +'.'+ a;
    }
  }

  styleNumber(number){
    number = Math.floor(number);
    let out='';
    out = this.dq(number,'');
    out = out.slice(1);
    while(out[0] == '0'){
      out = out.slice(1);
    }
    return out;
  }
  isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

}
