import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, Events, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../dashboard/dashboard';

import { GetJsonProvider } from '../../providers/get-json/get-json';
import { PostFormProvider } from '../../providers/post-form/post-form';
import { ServiceProvider } from '../../providers/service/service';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
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
  public reg;
  constructor(private store: Storage,public navParam: NavParams ,public navCtrl: NavController, public getj : GetJsonProvider,
     public postf : PostFormProvider, private app: MenuController,
     public plt : Platform,
     public event: Events,
     public service : ServiceProvider,
     public toastController : ToastController
    ) {
    this.app = app;
    this.app.enable(false);
    let loa = this.navParam.get('log');
    // console.log(loa);
    this.store = store;
      let a = this.store.get('API_Token');
      // console.log(a);
  }
  log ={
    user:'',
    password:''
  };
  logForm (){
    this.plt.ready().then((readySource)=>{
      // console.log('Platform ready from', readySource);
      // let url = 'http://app.onbank.vn/api/staff/login?username='+this.log.user+'&password='+this.log.password;
      let to = new Array();
      to['username'] = this.log.user;
      to['password'] = this.log.password;
      let tot = 'username='+to['username']+'&password='+to['password'];
      // console.log(tot);

      this.postf.postTo('http://app.onbank.vn/api/staff/login',tot,'').then(data=>{
        // console.log(data);
        this.data = data;
        
        // console.log(this.data);
        if(this.data.status==1){
          this.toastController.create({
            message: "Đăng nhập thành công",
            duration: 1500,
            position: 'middle'
          }).present()
          this.service.setUser(this.data.data.username);
          this.store.set('API_Token',this.data.data.API_Token);
          let time = new Date();
          let timenow = time.getTime();
          let timeexpire = timenow + 864000;
          // console.log(timeexpire);
          this.store.set('time-expire',timeexpire);
          this.store.set('log-in',this.data.data);
          //get bracnch and save that
          this.store.get('branch').then(br=>{
            // console.log('br',br);
          })
          this.store.set('branch',this.data.data.branch[0].id);
          this.store.set('list-branch',this.data.data.branch);
          this.event.publish('list-branch',this.data.data.branch);
          this.navCtrl.push(DashboardPage, {'log-in':this.data.data});
        } else {
          this.toastController.create({
            message: "Tài khoản hoặc mật khẩu sai!",
            duration: 1500,
            position: 'middle'
          }).present()
        }
      });
    })
  }


  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}



