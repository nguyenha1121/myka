import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
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

  public data;
  constructor(private store: Storage ,public navCtrl: NavController, public getj : GetJsonProvider, public postf : PostFormProvider, private app: MenuController) {
    this.app = app;
    this.app.enable(false);

    this.store = store;
      let a = this.store.get('API_Token');
      console.log(a);
  }
  log ={};
  logForm (){
    // this.getj.login(this.log).then(data => {
    //   this.data = data;
    //   console.log(this.data);
    //   if(this.data.status==1){
    //     this.navCtrl.push(DashboardPage, {'log-in':this.data.data});
    //   } else {
    //     window.location.reload();
    //   }
    // });
    // console.log(this.log);


    this.postf.postTo(this.log).then(data=>{
      // console.log(data);
      // console.log('s');
      this.data = data;
        console.log(this.data.data.API_Token);
            this.store.set('API_Token',this.data.data.API_Token);
            this.store.set('log-in',this.data.data);
        if(this.data.status==1){
          this.navCtrl.push(DashboardPage,{'log-in':this.data.data});
        } else {
          window.location.reload();
        }
    });
  }

  goRegister(){
  //   this.store.get('name').then((val) => {
  //    console.log('Your name is', val);
  //  });
    this.navCtrl.push(RegisterPage);
  }
}
