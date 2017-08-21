import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GetJsonProvider } from '../../../../providers/get-json/get-json';
import { PostFormProvider } from '../../../../providers/post-form/post-form';
import { ServiceProvider } from '../../../../providers/service/service';

/**
 * Generated class for the LendingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'thulai-modal',
  templateUrl: 'thulai-modal.html',
})
export class ThulaiModal {
  public data = {
    ngay_vay: 0,
    lich_thu: null,
    han_toi: null,
    id: null,
    so_tien: null,
    can_thu: null
  };


  public url = "http://app.onbank.vn/api/loan/collect?API_TOKEN=";
  public enableEdit=false;
  public readonly="";
  public summaryDate;
  public lich_thu;
  public user;
  public token;
  public br;
  constructor(
    public navParams: NavParams,
    public getj: GetJsonProvider,
    public ViewCtrl: ViewController,
    public service: ServiceProvider,
    public postf : PostFormProvider,
    public store: Storage
  ) {
    // this.data.ngay_vay = new Date().toISOString();

    this.store.get('API_Token').then(token=>{
      this.token = token;
    });
    // console.log(this.token);
    this.store.get('branch').then(br => {
      this.br = br;
    });

    this.user = this.service.getUser();
    this.ViewCtrl = ViewCtrl;
    this.data = this.navParams.get('param');
    // this.data.han_toi = this.a;
    console.log(this.data);
    this.lich_thu = JSON.parse(this.data.lich_thu);

    this.summaryDate = new Date().toISOString();
    this.data.han_toi = this.summaryDate;
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
    this.data.han_toi = this.summaryDate;
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

    edit(){
      let han_toi = new Date(this.data.han_toi);
      let out = (han_toi.getUTCFullYear())+"/"+(han_toi.getMonth() + 1)+"/"+han_toi.getDate();
      console.log(out);
      let form = "loan-id="+this.data.id+
                "&sum="+this.data.can_thu+
                "&next_pay="+out;
      let u = this.url+this.token+'&branch='+this.br;
      this.postf.postTo(u,form,'').then(log =>{
        console.log(log);

    });
    }

}
