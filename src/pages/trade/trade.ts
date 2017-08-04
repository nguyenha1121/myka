import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GetJsonProvider } from '../../providers/get-json/get-json';

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

  public url = "assets/gd.json";
  public data;
  public out;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modal : ModalController, public getj: GetJsonProvider, public store: Storage) {

    this.getj = getj;
    this.store = store;
    this.store.get('API_Token').then(val => {
      this.getj.load("assets/gd.json", val).then(data =>{
        this.data = data.data;
        this.out = this.loop(this.data);
        console.log(this.out);
      }
      )
    })
  }


  loop(_obj){
    var out =[];
    for (var key in _obj) {
    // skip loop if the property is from prototype
      if (!_obj.hasOwnProperty(key)) continue;

      var obj = _obj[key];
      for (var prop in obj) {
          // skip loop if the property is from prototype
          if(!obj.hasOwnProperty(prop)) continue;

          out.push({
            day: prop,
            value:  obj[prop]
          });
          // console.log(prop + " = " + obj[prop]);
        }
    }
    return out;
  }

  tinhtongtien(day){
    let out = 0;
    for(let i = 0; i < day.value.length;i++){
      console.log(out);
      let a = day.value[i].total;
      let b ='';
      for(let i=0; i< a.length; i++){
        if(a[i]!='.'){
          b += a[i];
        }
      }
      out = out +  parseInt(b);
    }

    return out;
  }

  canthu(day){
    let out :any;
    var date = new Date();

    let money = 0;
    for(let i = 0; i < day.value.length;i++){
      let now = date.getTime();
      let x = 1000;
      now = (now / x);
      let diff = ((now - day.value[i].time_stamp));
      diff = Math.floor(diff / 84600);
      if(diff > day.value[i].thoi_gian){
        diff = day.value[i].thoi_gian;
      }
      // console.log(diff);
      var moneys = (diff/day.value[i].chu_ky * day.value[i].chi_phi);
      // console.log(moneys);
      moneys = Math.floor(moneys);
      let lich = JSON.parse(day.value[i].lich_thu);
      for(let k =0; k<lich.length;k++){
        if(lich[k].sotien){

          moneys -= (lich[k].sotien);
        }

      }
      money = money + moneys;
    }
    // console.log(out);
    return {out : money};
  }

  dathu(day){
    let out :any;
    let money = 0;
    for(let i = 0; i < day.value.length;i++){
      // console.log(diff);
      var moneys = 0;
      // console.log(moneys);
      moneys = Math.floor(moneys);
      let lich = JSON.parse(day.value[i].lich_thu);
      for(let k =0; k<lich.length;k++){
        if(lich[k].sotien){

          moneys += (lich[k].sotien);
        }

      }
      money = money + moneys;
    }
    // console.log(out);
    return {out : money};
  }

  viewDay(day){
    let dat = new Date(day);
    var d = dat.getDate() ;
    var m = dat.getMonth() + 1;
    var out = (d+'/'+m);
    return out;
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
