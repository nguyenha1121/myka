import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController, AlertController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GetJsonProvider } from '../../providers/get-json/get-json';
import { PostFormProvider } from '../../providers/post-form/post-form';
import { ServiceProvider } from '../../providers/service/service';

import { TatToanModal } from './tat-toan/tattoan';


@Component({
  selector: 'page-sum',
  templateUrl: 'sum.html',
})
export class SumPage {

  public listCustomer:any;
  public su = {
    staff:'',
    sotien:0,
    kh: null
  }
  api;
  br;
  public url = "http://app.onbank.vn/api/loan/collect?API_TOKEN=";
  public kh;
  public selected = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider,
    public getj: GetJsonProvider, public store: Storage, public alert: AlertController, public postf : PostFormProvider,
    public event: Events, public modal: ModalController) {
    this.store = store;
    this.getj = getj;
    this.store.get('API_Token').then(token =>{
      this.api = token;
      this.store.get('branch').then(br => {
        this.br = br;
        this.getj.load('http://app.onbank.vn/api/customer/list?API_TOKEN='+token+'&branch='+br,'').then(data =>{
          this.listCustomer = data.data.items;
          // console.log(data);
        });
      })
    });
    this.su.staff = this.service.getUser();
    this.event.subscribe('thulai',(kh)=>{
      this.kh = kh;
    });
  }

  tattoan(selected){
    let modal = this.modal.create(TatToanModal,{
       data: selected,
       api: this.api,
       br: this.br
    });
    modal.present();
  }

  customer(val : any){
    this.selected = val;
    this.selected.khachhang = JSON.parse(this.selected.khach_hang);
    console.log(this.selected);
    this.su.sotien = this.parseNum(this.selected.can_thu);
  }

  jsonParse(json){
    return JSON.parse(json);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SumPage');
  }

  submitSum(){
    console.log(this.su);
  }

  compareFn(option1: any, option2: any) {
      return option1.id === option2.id;
  }
  save(){
    console.log(this.su);
     let alert = this.alert.create({
      title: 'Ooopp! ',
      subTitle: 'You need to complete all field',
      buttons: ['OK']
    });
     if(this.su.sotien == 0 || this.su.kh == null ){
       alert.present();
       return 0;
     }
     else {
      let form = "loan-id="+this.selected.id+
                "&sum="+this.su.sotien;
      console.log(form);
      let u = this.url+this.api+'&branch='+this.br;
      this.postf.postTo(u,form,'').then(log =>{
        console.log(log);
        
        let alert2 = this.alert.create({
          title: 'Done! ',
          subTitle: 'Thu lãi thành công!',
          buttons: [{
            text: 'Ok',
            handler: () => {
              window.location.reload();
            }
          }]
        });
        alert2.present();
      });
     }
  }
  parseNum(num){
    let out = "";
    for(let i = 0; i<num.length; i++ ){
      if(num[i] != "."){
        out += num[i];
      }
    }
    return Number(out);
  }
}
