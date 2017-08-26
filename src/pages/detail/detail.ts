import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';

import { GetJsonProvider } from '../../providers/get-json/get-json';


// import { GetJsonProvider } from '../../../../providers/get-json/get-json';
/**
 * Generated class for the ThuLaiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public de={};
  public helo="jsjs";
  public params;
  public ab;
  public log="wait me...";
  public ori="default";
  public out=[];
  public token;
  public br;
  public url = "http://app.onbank.vn/api/upload?API_TOKEN=";
  public filepath = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public getj: GetJsonProvider, public store: Storage,
     public filechoose: FileChooser, public upload : FileTransfer) {
    this.filechoose = filechoose;
    this.upload = upload;
    this.store.get('API_Token').then(token=>{
      this.token = token;
    });
    // console.log(this.token);
    this.store.get('branch').then(br => {
      this.br = br;
    });

    this.params = this.navParams.get('late-time');
    this.helo = this.params;
    // this.navCtrl.remove();
    for(let i = 1;i<10000;i++){
      this.ab = i;
    }
  }

  fileTransfer: FileTransferObject = this.upload.create();

  loadImage(){
    this.filechoose.open().then(uri=>{
      console.log(uri);
      this.ori = uri;
      this.filepath = uri;
    }).catch(e => console.log(e));
  }
  uploadImage(){
    this.log = "waiting ...";
    let u = this.url+this.token+'&branch='+this.br;
    console.log(u);
    this.fileTransfer.upload(this.ori,u).then((result) =>{
      console.log(result);
      let log = JSON.parse(result.response);
      let keys = Object.keys(log);
      for( let k = 0; k< keys.length;k++){
        this.out.push({
          key: keys[k],
          value: log[keys[k]]
        })
      };
    },(err)=>{
      console.log(err);
      let log = JSON.parse(err.target);
      let keys = Object.keys(log);
      this.filepath = log;
    });
  }
  clickme(){
    this.ab= 10;
    for(let i = 1;i<10000;i++){
      this.ab = i;
    }
    this.ab = 100;
  }

  ionViewDidLoad() {

  }

}
