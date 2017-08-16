import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../dashboard/dashboard';

import { GetJsonProvider } from '../../providers/get-json/get-json';
import { PostFormProvider } from '../../providers/post-form/post-form';

import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public url = 'http://app.onbank.vn/api/staff/login?username=abcxyz&password=123456'
  public data;
  public reg;
  constructor(private store: Storage,public navParam: NavParams ,public navCtrl: NavController, public getj : GetJsonProvider,
     public postf : PostFormProvider, private app: MenuController,
     public plt : Platform
    ) {
    this.app = app;
    this.app.enable(false);
    let loa = this.navParam.get('log');
    console.log(loa);
    this.store = store;
      let a = this.store.get('API_Token');
      console.log(a);
  }
  log ={
    user:'',
    password:''
  };
  logForm (){
    this.plt.ready().then((readySource)=>{
      console.log('Platform ready from', readySource);
      let url = 'http://app.onbank.vn/api/staff/login?username='+this.log.user+'&password='+this.log.password;
      let to = new Array();
      to['username'] = this.log.user;
      to['password'] = this.log.password;
      let tot = 'username='+to['username']+'&password='+to['password'];
      console.log(tot);
      this.postf.postTo('http://app.onbank.vn/api/staff/login',tot,'').then(data=>{
        console.log(data);
        this.data = data;
        this.store.set('API_Token',this.data.data.API_Token);
        let time = new Date();
        let timenow = time.getTime();
        let timeexpire = timenow + 100000;
        console.log(timeexpire);
        this.store.set('time-expire',timeexpire);
        this.store.set('log-in',this.data.data);
        //get bracnch and save that
        this.store.set('branch',this.data.data.branch[0].id);
        this.store.set('list-branch',this.data.data.branch);
        console.log(this.data);
        if(this.data.status==1){
          this.navCtrl.push(DashboardPage, {'log-in':this.data.data});
        } else {
          window.location.reload();
        }
      });
    })
  }

  goRegister(){
  //   this.store.get('name').then((val) => {
  //    console.log('Your name is', val);
  //  });
    this.navCtrl.push(RegisterPage);
  }
}




//
// this.postf.postTo(this.url,this.log).then(data=>{
//   this.data = data;
//     console.log(this.data.data.API_Token);
//         this.store.set('API_Token',this.data.data.API_Token);
//         let time = new Date();
//         let timenow = time.getTime();
//         let timeexpire = timenow + 86400000;
//         this.store.set('time-expire',timeexpire);
//         this.store.set('log-in',this.data.data);
//     if(this.data.status==1){
//       this.navCtrl.push(DashboardPage,{'log-in':this.data.data});
//     } else {
//       window.location.reload();
//     }
// });
