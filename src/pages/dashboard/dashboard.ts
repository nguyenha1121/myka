import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TradePage } from '../trade/trade';
import { LoanPage } from '../loan/loan';
import { FinalizePage } from '../finalize/finalize';
import { SumPage } from '../sum/sum';
import { DbHomePage } from '../db-home/db-home';
import { GetJsonProvider } from '../../providers/get-json/get-json';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  home:any = DbHomePage;
  transaction:any = TradePage;
  loan:any = LoanPage;
  interest:any = SumPage;
  finalize:any = FinalizePage;
  public data;
  public tabs;
  public page = [];
  public ftabs = [];
  // private url = 'http://localhost:8100/assets/ex.json';
  // get data for test
  constructor(public store:Storage, public navCtrl: NavController, public navParams: NavParams, public getj: GetJsonProvider) {
    // console.log('jsjsj');
    this.data = navParams.get('log-in');
    let ftabs =[];
      this.tabs = this.data.menu.tabs;
      this.tabs.forEach(function(index, value, array){
        // console.log(index["tab-icon"]);
        ftabs.push({
          name: index.name,
          icon: index['tab-icon']
        });
      }) ;
      this.tabs = ftabs;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
//
// if(this.data){
//   console.log('co data');
//   this.tabs = this.data.menu.tabs;
//   this.tabs.forEach(function(index, value, array){
//     // console.log(index["tab-icon"]);
//     ftabs.push({
//       name: index.name,
//       icon: index['tab-icon']
//     });
//   }) ;
//   this.tabs = ftabs;
// } else {
//     this.store.get('log-in').then(val=>{
//         this.data = val;
//
//         console.log('1');
//         console.log(this.data.menu.tabs);
//         console.log('2');
//         this.tabs = this.data.menu.tabs;
//         // ForEachCallback
//         this.tabs.forEach(function(index, value, array){
//           // console.log(index["tab-icon"]);
//           ftabs.push({
//             name: index.name,
//             icon: index['tab-icon']
//           });
//         }) ;
//         this.tabs = ftabs;
//         console.log(this.tabs);
//     })
// };
