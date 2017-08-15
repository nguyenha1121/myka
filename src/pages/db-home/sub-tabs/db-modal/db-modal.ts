import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';

import { GetJsonProvider } from '../../../../providers/get-json/get-json';

/**
 * Generated class for the LendingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'db-modal',
  templateUrl: 'db-modal.html',
})
export class DbModal {

  public data = {
    ngay_vay: 0,
    lich_thu: null
  };

  public enableEdit=false;
  private url = "assets/ex.json";
  public url_edit = '/api';
  public readonly="";
  public summaryDate;
  public lich_thu;
  constructor(
    public navParams: NavParams,
    public getj: GetJsonProvider,
    public ViewCtrl: ViewController
  ) {
    // this.data.ngay_vay = new Date().toISOString();
    this.ViewCtrl = ViewCtrl;
    this.data = this.navParams.get('param');
    console.log(this.data);
    console.log(JSON.parse(this.data.lich_thu));
    this.lich_thu = JSON.parse(this.data.lich_thu);
    this.summaryDate = new Date(this.data.ngay_vay).toISOString();
    // this.data = 'aaaa';
  }

  dateConvert(date){
    var dt = new Date(date);
    return((dt.getMonth() + 1) + '/' + dt.getDate());
  }

  dismiss(){
    this.ViewCtrl.dismiss();
  }

  onChangehere(ev){
    let date = new Date(this.summaryDate);
    this.data.ngay_vay = this.summaryDate;
    // console.log(this.data.ngay_vay);
  }
  editEnable(){
    this.enableEdit = !this.enableEdit;
    this.readonly = "readonly";
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

}
