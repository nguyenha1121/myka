import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';


import { PostFormProvider } from '../../providers/post-form/post-form';

import { ServiceProvider } from '../../providers/service/service';
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
  public error;
  public uri = "";
  public token;
  public br;
  public log;
  public url = "http://app.onbank.vn/api/loan/save?API_TOKEN=";
  public urlUpload = "http://app.onbank.vn/api/upload?API_TOKEN=";
  constructor(public filechoose: FileChooser ,public navCtrl: NavController, public navParams: NavParams,
    public store: Storage, public postf: PostFormProvider, public fileTranfer : FileTransfer,
    public service: ServiceProvider, public toast: ToastController) {
    this.filechoose = filechoose;
    this.store.get('API_Token').then(token=>{
      this.token = token;
    });
    // console.log(this.token);
    this.store.get('branch').then(br => {
      this.br = br;
    });
    // console.log(this.service.getUser());
  }
  upload : FileTransferObject = this.fileTranfer.create();

  cd = {
    sotien:'',
    songay:'',
    chuki:'',
    chiphi:'',
    tenkhach:'',
    sdt:'',
    diachi:'',
    cmt:'',
    cattruoc:'',
    ghichu:'',
    taisan:''
  };

//   sum
// duration
// cycle
// note
// rate
// name
// type
// phone
// identity
// address
// property
// cat-truoc

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CamDoPage');
  }

  save(){
    // console.log("save");
    this.toast.create({
        message:  "Saving...",
        duration: 2500,
        position: "middle"
      });
    // console.log(this.uri != "");
    if(this.uri != ""){
      var link = this.urlUpload+this.token+'&branch='+this.br;
      this.upload.upload(this.uri,link).then((suc)=>{
        this.log = JSON.parse(suc.response);
        let toast = this.toast.create({
          message: "Upload success !",
          duration: 2000,
          position: 'top'
        });
        let form = 'sum='+this.cd.sotien+
            '&duration='+this.cd.songay+
            '&cycle='+this.cd.chuki+
            '&rate='+this.cd.chiphi+
            '&name='+this.cd.tenkhach+
            '&type='+'1'+
            '&image-url'+this.log+
            '&phone='+this.cd.sdt+
            '&address='+this.cd.diachi+
            '&identity='+this.cd.cmt+
            '&cat-truoc='+this.cd.cattruoc+
            '&note='+this.cd.ghichu+
            '&property='+this.cd.taisan
        ;

          let u = this.url+this.token+'&branch='+this.br;
          this.postf.postTo(u,form,'').then(log =>{
            console.log(log);
            if(log.status == 1){
              this.toast.create({
                message:  "Success",
                duration: 500,
                position: "middle"
              });
              window.location.reload();
            } else {
              this.toast.create({
                message:  "Something wrong ...",
                duration: 1500,
                position: "middle"
              });
            }
        });
      },(err)=>{
        let toast = this.toast.create({
          message: "Upload fail, something wrong. Please try again later!"
        })
      });
    }
    else {
      let form = 'sum='+this.cd.sotien+
          '&duration='+this.cd.songay+
          '&cycle='+this.cd.chuki+
          '&rate='+this.cd.chiphi+
          '&name='+this.cd.tenkhach+
          '&type='+'1'+
          '&phone='+this.cd.sdt+
          '&address='+this.cd.diachi+
          '&identity='+this.cd.cmt+
          '&cat-truoc='+this.cd.cattruoc+
          '&note='+this.cd.ghichu+
          '&property='+this.cd.taisan
      ;

        let u = this.url+this.token+'&branch='+this.br;
        this.postf.postTo(u,form,'').then(log =>{
          console.log(log);
          if(log.status == 1){
            window.location.reload();
          } else {
            this.toast.create({
              message:  "Something wrong ...",
              duration: 1500,
              position: "middle"
            }) ;
          }
      });
    }
  }
  taiAnh(){
    this.filechoose.open().then(uri =>{
      console.log("ss");
      this.uri = uri;
    }).catch(e => console.log(e));
  }

}
