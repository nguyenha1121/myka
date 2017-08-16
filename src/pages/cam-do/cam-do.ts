import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { PostFormProvider } from '../../providers/post-form/post-form';

/**
 * Generated class for the CamDoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cam-do',
  templateUrl: 'cam-do.html',
})
export class CamDoPage {

  public uri:any;
  public token;
  public br;
  public url = "http://app.onbank.vn/api/loan/save?API_TOKEN=";
  constructor(public filechoose: FileChooser ,public navCtrl: NavController, public navParams: NavParams, public store: Storage, public postf: PostFormProvider) {
    this.filechoose = filechoose;
    this.store.get('API_Token').then(token=>{
      this.token = token;
    });
    // console.log(this.token);
    this.store.get('branch').then(br => {
      this.br = br;
    });
  }

  cd = {
    sotien:'',
    songay:'',
    chuki:'',
    chiphi:'',
    tenkhach:'',
    sdt:'',
    diachi:'',
    cmt:'',
    cattruoc:''
  };

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CamDoPage');
  }

  save(){
    console.log(this.cd);

    let form = 'sum='+this.cd.sotien+
        '&duration='+this.cd.songay+
        '&cycle='+this.cd.chuki+
        '&rate='+this.cd.chiphi+
        '&name='+this.cd.tenkhach+
        '&type='+'1'+
        '&phone='+this.cd.sdt+
        '&address'+this.cd.diachi+
        '&identity'+this.cd.cmt+
        '&cat-truoc'+this.cd.cattruoc
    ;

      let u = this.url+this.token+'&branch='+this.br;
      this.postf.postTo(u,form,'').then(log =>{
        console.log(log);

    });

  }
  // taiAnh(){
  //   this.filechoose.open().then(uri =>{
  //     console.log(uri);
  //     if(uri){
  //       this.uri = uri;
  //     }
  //   }).catch(e => console.log(e));
  // }

}
