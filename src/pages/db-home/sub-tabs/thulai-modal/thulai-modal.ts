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
  haschangeday = false;
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
    this.haschangeday = true;
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
      let form = "";
      if(this.haschangeday){
        let han_toi = new Date(this.data.han_toi);
        let thang = han_toi.getMonth() + 1;
        let m="";
        let n ="";
        if(thang<10){
          m = '0'+thang;
        } else { m = ''+thang }
        let ngay = han_toi.getDate();
        if(ngay<10){
           n = '0'+ngay;
        } else { n = ''+ngay; }
        let out = (han_toi.getUTCFullYear())+"/"+m+"/"+n;
        form = "loan-id="+this.data.id+
                "&sum="+this.data.can_thu+
                "&next_pay='"+out+"'";
      }
      else {
        form = "loan-id="+this.data.id+
                "&sum="+this.data.can_thu;
      }
      
      let u = this.url+this.token+'&branch='+this.br;
      this.postf.postTo(u,form,'').then(log =>{
        console.log(log);
        window.location.reload();
      });
    }

}
