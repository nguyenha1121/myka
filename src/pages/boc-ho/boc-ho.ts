import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { PostFormProvider } from '../../providers/post-form/post-form';

import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the BocHoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-boc-ho',
  templateUrl: 'boc-ho.html',
})
export class BocHoPage {

  public token;
  public br;
  public url = "http://app.onbank.vn/api/loan/save?API_TOKEN=";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public postf: PostFormProvider, public service: ServiceProvider,
    public store: Storage,
  ) {

    this.store.get('API_Token').then(token=>{
      this.token = token;
    });
    // console.log(this.token);
    this.store.get('branch').then(br => {
      this.br = br;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BocHoPage');
  }
  submitBocho(){
    console.log('submit BH');
  }

  bh = {
    sotien:'',
    songay:'',
    chuki:'',
    chiphi:'',
    tenkhach:'',
    phone:'',
    diachi:'',
    cmt:'',
    ghichu:'',
    taisan:''
  };

  save(){
    console.log(this.bh);

    let form = 'sum='+this.bh.sotien+
        '&duration='+this.bh.songay+
        '&cycle='+this.bh.chuki+
        '&rate='+this.bh.chiphi+
        '&name='+this.bh.tenkhach+
        '&type='+'2'+
        '&phone='+this.bh.phone+
        '&address='+this.bh.diachi+
        '&identity='+this.bh.cmt+
        '&note='+this.bh.ghichu+
        '&property='+this.bh.taisan
    ;

      let u = this.url+this.token+'&branch='+this.br;
      this.postf.postTo(u,form,'').then(log =>{
        console.log(log);
    });

  }

}
