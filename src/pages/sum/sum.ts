import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GetJsonProvider } from '../../providers/get-json/get-json';

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

  }
  public kh;
  constructor(public navCtrl: NavController, public navParams: NavParams, public getj: GetJsonProvider, public store: Storage, public event: Events) {
    this.store = store;
    this.getj = getj;
    this.store.get('API_Token').then(token =>{
      this.store.get('branch').then(br => {
        this.getj.load('http://app.onbank.vn/api/customer/list?API_TOKEN='+token+'&branch='+br,'').then(data =>{
          this.listCustomer = data.data.items;
          // console.log(this.listCustomer);
          console.log(data);
        });
      })

    });
    this.event.subscribe('thulai',(kh)=>{
      this.kh = kh;
    });
    // console.log('ss');
    // console.log(this.navParams.data);
    // console.log('ss');

    // console.log(this.kh);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SumPage');
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
