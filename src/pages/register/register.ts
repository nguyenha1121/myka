import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  public load:any;
  constructor(public loading: LoadingController ,public navCtrl: NavController, public navParams: NavParams, public getj: GetJsonProvider,public post: PostFormProvider, public store: Storage) {
    this.load = this.loading.create({
      content: "Please wait!"
    });

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
    phone:'',
    full_name: ''
  };
  public data;
  registerform(){
    this.load.present();
    let url = "http://app.onbank.vn/api/staff/register";
    // let forn = ?username='+this.reg.user+'&password='+this.reg.password+'&repassword='+this.reg.repassword+'&email='+this.reg.email+'&identity-no=1'+'&phone='+'this.reg.phone';
    let form =
       'username='+ this.reg.user
       +'&password=' + this.reg.password
       +'&repassword=' + this.reg.rePassword
       +'&email=' + this.reg.email
       +'&phone=' + this.reg.phone+
       '&full_name=' + this.reg.full_name
    ;


    // console.log(form);

    this.post.postTo(url,form,'').then(data =>{
      // console.log(data);
      if(data.status == 1){
        this.navCtrl.setRoot(LoginPage,{log:{
          user: this.reg.user,
          password: this.reg.password
        }});
      }
        this.load.dissmiss();
      });
  }

  goLogin(){
    this.navCtrl.push(LoginPage);
  }

}
