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
  constructor(public plt: Platform, private store: Storage ,public navCtrl: NavController, public getj : GetJsonProvider, public postf : PostFormProvider, private app: MenuController) {
    this.app = app;
    this.app.enable(false);

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
        this.getj.loadlogin(url,false).then(data =>{
            this.data = data;
            this.store.set('API_Token',this.data.data.API_Token);
            let time = new Date();
            let timenow = time.getTime();
            let timeexpire = timenow + 86400000;
            console.log(timeexpire);
            this.store.set('time-expire',timeexpire);
            this.store.set('log-in',this.data.data);
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
