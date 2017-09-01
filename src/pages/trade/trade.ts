import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, PopoverController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GetJsonProvider } from '../../providers/get-json/get-json';

import { NewTradeModal } from './new-trade/new-trade';
import { TradeModal } from './modal-trade/modal-trade';

import { SumPage } from '../sum/sum';
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
  public data:any;
  public out;
  br;
  ld;
  api;
  empty=false;
  key ="";
  save;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modal : ModalController, public event : Events, public popov: PopoverController,
    public getj: GetJsonProvider, public store: Storage,
    public loading: LoadingController) {
    this.getj = getj;
    this.store = store;
    this.refresh();
    this.modal = modal;
  }
// get data 
  refresh(){
    this.ld = this.loading.create({
      content: "Please wait ..."
    });
    this.ld.present();
    this.store.get('API_Token').then(val => {
      this.api = val;
      this.store.get('branch').then(br => {
        this.br = br;
        this.getj.load("http://app.onbank.vn/api/transaction/list"+'?API_TOKEN='+val+'&branch='+br, '').then(data =>{
          // console.log(data);
          this.data = data.data.items;
          this.out = this.loop(this.data);
          this.save = this.out;
          console.log(this.out);
          this.ld.dismiss();
        });
      })
    });
  }


  toArr(obj){
    let keys = Object.keys(obj);
    console.log(keys);
    var out = [];
    for(let k=0; k<keys.length; k++){
      if(keys[k]!="tongthuArr"){
        out.push({
          k: keys[k],
          v: (obj[keys[k]])
        });
      }   
    };
    return out;
  }

  onChangehere(){

    console.log(this.summaryDate);
    let date = new Date(this.summaryDate);
    let m = date.getMonth() +1;
    let mo = "";
    if(m<10){
      mo = "0"+m;
    } else{
      mo = ""+m;
    }
    let n = date.getDate();
    let ng = "";
    if(n<10){
      ng = "0"+n;
    } else {
      ng = ""+n;
    }
    let strDate = ng+"/"+mo+"/"+date.getUTCFullYear();
    let ink = this.save;
    let output = [];
    for(let k =0; k < ink.length; k++){
       if(ink[k].day == strDate){
           output.push(ink[k]);
       }
    }
    this.out = output;
  }

  search(){
    if( this.key != ''){
      this.getj.load("http://app.onbank.vn/api/search/?search="+this.key+"&object[]=staff&object[]=customer&branch-filter=0"+'&API_TOKEN='+this.api+'&branch='+this.br, '').then(data=>{
        console.log(data);
         let mo = this.modal.create(NewTradeModal,{
           param: data,
           key: this.key,
           api: this.api,
           br: this.br
         });
         mo.present();
      });
    } 
  }

  ref(){
    this.refresh();
  }

  clickme(gd){
    this.getj.load("http://app.onbank.vn/api/transaction/info/"+gd.id+'?API_TOKEN='+this.api+'&branch='+this.br, '').then(data =>{
      let modal = this.modal.create(TradeModal,{
        'param':data,
        api: this.api,
        br: this.br
      });
      modal.present();
    });
    
  }

  loop(_obj){
    var out =[];
    for (var key in _obj) {
    // skip loop if the property is from prototype
      if (!_obj.hasOwnProperty(key)) continue;

      var obj = _obj[key];
      out.push({
        day: key,
        value: obj
      })
    }
    return out;
  }

  tinhtongtien(day){
    let out = 0;
    for(let i = 0; i < day.value.length;i++){
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
    day = day.slice(0, day.length - 5);
    return day;
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
    if(number < 0){
      return '0';
    }
    number = Math.floor(number);
    let out='';
    out = this.dq(number,'');
    out = out.slice(1);
    while(out[0] == '0'){
      out = out.slice(1);
    }
    return out;
  }

  trade = {};
  summaryDate: any = new Date().toISOString();

  openCalendar(){
    console.log('modal');

  }

  testtab(){
    this.navCtrl.parent.select(3);
  }

}



// for (var prop in obj) {
//     // skip loop if the property is from prototype
//     if(!obj.hasOwnProperty(prop)) continue;
//
//     out.push({
//       day: prop,
//       value:  obj[prop]
//     });
//     // console.log(prop + " = " + obj[prop]);
//   }
