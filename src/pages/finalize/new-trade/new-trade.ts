import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';

import { GetJsonProvider } from '../../../providers/get-json/get-json';

/**
 * Generated class for the LendingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'new-trade',
  templateUrl: 'new-trade.html',
})
export class NewTradeModal2 {

  public data = {
    key : "",
    result: null,
    data:null
  };

  public enableEdit=false;
  public readonly="";
  public summaryDate;
  key:any;
  result:any;
  customer ;
  staff;
  api;
  br;


  constructor(
    public navParams: NavParams,
    public getj: GetJsonProvider,
    public ViewCtrl: ViewController
  ) {
    // this.data.ngay_vay = new Date().toISOString();
    this.ViewCtrl = ViewCtrl;
    this.data = this.navParams.get('param');
    this.key = this.navParams.get('key');
    this.api = this.navParams.get('api');
    this.br = this.navParams.get('br');
    this.customer = this.toArr(this.data.data.customers);
    this.staff = this.toArr(this.data.data.staff);
        console.log(this.customer, this.staff);
  }

  search(){
    if( this.key != ''){
      this.getj.load("http://app.onbank.vn/api/search/?search="+this.key+"&object[]=staff&object[]=customer&branch-filter=0"+'&API_TOKEN='+this.api+'&branch='+this.br, '').then(data=>{
        this.data = data;
        this.customer = this.toArr(this.data.data.customers);
        this.staff = this.toArr(this.data.data.staff);
      });
    } 
  }

  dateConvert(date){
    var dt = new Date(date);
    return((dt.getMonth() + 1) + '/' + dt.getDate());
  }

  toArr(obj){
    if(Array.isArray(obj)){
      return obj;
    }
    let arr = [];
    let keys = Object.keys(obj);
    for(let i =0; i< keys.length;i++){
      arr.push(obj[keys[i]]);
    }
    return arr;
  }

  parseJ(json){
    let output = JSON.parse(json);
    return output;
  }

  dismiss(){
    this.ViewCtrl.dismiss();
  }

  // onChangehere(ev){
  //   let date = new Date(this.summaryDate);
  //   this.data.ngay_vay = this.summaryDate;
  //   console.log(this.data.ngay_vay);
  // }
  editEnable(){
    this.enableEdit = !this.enableEdit;
    this.readonly = "readonly";
  }

}
