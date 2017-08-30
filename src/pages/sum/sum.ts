import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GetJsonProvider } from '../../providers/get-json/get-json';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the SumPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sum',
  templateUrl: 'sum.html',
})
export class SumPage {

  public listCustomer:any;
  public su = {
    staff:''
  }
  public kh;
  public selected = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider,
    public getj: GetJsonProvider, public store: Storage, public event: Events) {
    this.store = store;
    this.getj = getj;
    this.store.get('API_Token').then(token =>{
      this.store.get('branch').then(br => {
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
    // console.log('ss');
    // console.log(this.navParams.data);
    // console.log('ss');

    // console.log(this.kh);
  }

  customer(val : any){
    this.selected = val;
    this.selected.khachhang = JSON.parse(this.selected.khach_hang);
    console.log(this.selected);
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
  }
}
