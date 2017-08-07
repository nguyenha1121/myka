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
export class NewTradeModal {

  public data = {
    // ngay_vay: 0
  };

  public enableEdit=false;
  public readonly="";
  public summaryDate;
  constructor(
    public navParams: NavParams,
    public getj: GetJsonProvider,
    public ViewCtrl: ViewController
  ) {
    // this.data.ngay_vay = new Date().toISOString();
    this.ViewCtrl = ViewCtrl;
    this.data = this.navParams.get('param');
    // console.log(this.data.ngay_vay);
    // this.summaryDate = new Date(this.data.ngay_vay).toISOString();
    // // this.data = 'aaaa';
  }

  dateConvert(date){
    var dt = new Date(date);
    return((dt.getMonth() + 1) + '/' + dt.getDate());
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
