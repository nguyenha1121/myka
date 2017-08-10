import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GetJsonProvider } from '../../providers/get-json/get-json';
import { PostFormProvider } from '../../providers/post-form/post-form';

import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public getj: GetJsonProvider,public post: PostFormProvider, public store: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
///api/staff/register?username=&password=&repassword=&email=&identity-no=&phone=
  reg = {
    user:'',
    password:'',
    rePassword:'',
    email:'',
    phone:''
  };
  public data;
  registerform(){
    let url = 'http://app.onbank.vn/api/staff/register';
    // let forn = ?username='+this.reg.user+'&password='+this.reg.password+'&repassword='+this.reg.repassword+'&email='+this.reg.email+'&identity-no=1'+'&phone='+'this.reg.phone';
    let form = {
       username : this.reg.user,
       password : this.reg.password,
       repassword : this.reg.rePassword,
       email : this.reg.email,
       phone : this.reg.phone
    }
    console.log(form);
    this.post.postTo(url,form,'').then(data =>{
      console.log(data);
        // this.data = data;
        // this.store.set('API_Token',this.data.data.API_Token);
        // let time = new Date();
        // let timenow = time.getTime();
        // let timeexpire = timenow + 86400;
        // console.log(timeexpire);
        // this.store.set('time-expire',timeexpire);
        // this.store.set('log-in',this.data.data);
        // console.log(this.data);
        // if(this.data.status==1){
        //   this.navCtrl.push(DashboardPage, {'log-in':this.data.data});
        // } else {
        //   window.location.reload();
        // }
      });
  }

  goLogin(){
    this.navCtrl.push(LoginPage);
  }

}
