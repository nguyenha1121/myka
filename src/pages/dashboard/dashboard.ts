import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ScrollableTabs } from '../../include/scrollable-tabs';
import { TradePage } from '../trade/trade';
import { LoanPage } from '../loan/loan';
import { FinalizePage } from '../finalize/finalize';
import { SumPage } from '../sum/sum';
import { DbHomePage } from '../db-home/db-home';
import { DbHomeLoading } from '../db-home/db-loading';
import { GetJsonProvider } from '../../providers/get-json/get-json';

import { StaffPage } from '../staff/staff';

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
  home:any = DbHomeLoading;
  transaction:any = TradePage;
  loan:any = LoanPage;
  interest:any = SumPage;
  finalize:any = FinalizePage;
  public data;
  public tb =[];
  public page = [];
  public ftabs = [];
  scrollableTabsopts: any = {};
  public select = 0;
  // private url = 'http://localhost:8100/assets/ex.json';
  // get data for test
  constructor(public store:Storage, public navCtrl: NavController, public navParams: NavParams,
    public getj: GetJsonProvider, public event: Events) {
    // console.log('jsjsj');
    this.data = this.navParams.get('log-in');
    console.log(this.data);
    let a = this.data.menu;
    // if( a=='all'){
    //   console.log('all');
    //   a = '{"home":["view","edit","export"],"transaction":["view","edit","export"],"lending":["view","edit","export"],"gaining":["view","edit","export"],"finalizing":["view","edit","export"]}';
    // } 
    // let ob = JSON.parse(a);
    console.log(a);
    this.tb = this.loop(a);
    // console.log('hehehhe');
    console.log(this.tb);

  }



  refreshScrollbarTabs() {
   this.scrollableTabsopts = { refresh: true };
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  loop(_obj){
    var out =[];
    for (var key in _obj) {
    // skip loop if the property is from prototype
      if (!_obj.hasOwnProperty(key)) continue;
      var obj = _obj[key];

      let icon = "bonfire";
      let kk = "Bonfire";
      let page:any = StaffPage;
      if(key == "tab-1"){
        icon = "home";
        kk = "Home";
        page = this.home;
      } else if( key == "tab-2"){
        icon = "swap";
        kk = "Giao dịch";
        page = this.transaction;
      } else if(key == "tab-3"){
        icon = "card";
        kk = "Thêm Mới";
        page = this.loan;
      } else if(key == "tab-4"){
        icon = "refresh";
        kk = "Thu lãi";
        page = this.interest;
      } else if(key == "tab-5"){
        icon = "logo-usd";
        kk = "Thống kê";
        page = this.finalize;
      }
      else kk = key;
      out.push({
        tab: kk,
        own: {
          title: (obj.title)?obj.title: "Thêm mới",
          icon: obj.icon
        },
        icon: icon,
        page: page,
      })
    }
    return out;
  }

  isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

}
//
