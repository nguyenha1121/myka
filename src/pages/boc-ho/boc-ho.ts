import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams ,ToastController, Platform, LoadingController} from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
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

  public error;
  public uri = "";
  public token;
  public br;
  public log;
  public url = "http://app.onbank.vn/api/loan/save?API_TOKEN=";
  public urlUpload = "http://app.onbank.vn/api/upload?API_TOKEN=";

  constructor(public filechoose: FileChooser ,public navCtrl: NavController, public navParams: NavParams,
    public store: Storage, public postf: PostFormProvider, public fileTranfer : FileTransfer,
    public platform: Platform,public loading: LoadingController,
    public service: ServiceProvider, public toast: ToastController) {
    this.filechoose = filechoose;
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
    sdt:'',
    diachi:'',
    cmt:'',
    ghichu:'',
    taisan:''
  };

  upload: FileTransferObject = this.fileTranfer.create();

  save(){
    // console.log(this.bh);
    let toast = this.toast.create({
        message:  "Saving...",
        duration: 2500,
        position: "middle"
      });
    toast.present();
    if(this.uri != ""){
     var link = this.urlUpload+this.token+'&branch='+this.br;
      this.upload.upload(this.uri,link).then((suc)=>{
        this.log = JSON.parse(suc.response);
        let toast = this.toast.create({
          message: "Upload success !",
          duration: 2000,
          position: 'top'
        });
        toast.present();
        let form = 'sum='+this.bh.sotien+
            '&duration='+this.bh.songay+
            '&cycle='+this.bh.chuki+
            '&rate='+this.bh.chiphi+
            '&name='+this.bh.tenkhach+
            '&type='+'2'+
            '&image-url'+this.log+
            '&phone='+this.bh.sdt+
            '&address='+this.bh.diachi+
            '&identity='+this.bh.cmt+
            '&note='+this.bh.ghichu+
            '&property='+this.bh.taisan
        ;

          let u = this.url+this.token+'&branch='+this.br;
          this.postf.postTo(u,form,'').then(log =>{
            console.log(log);
            if(log.status == 1){
              let  toa = this.toast.create({
                message:  "Success",
                duration: 500,
                position: "middle"
              });
              toa.present();
              window.location.reload();
            } else {
              let  toa = this.toast.create({
                message:  "Something wrong ...",
                duration: 1500,
                position: "middle"
              });
              toa.present();
            }
        });
      },(err)=>{
        let toast = this.toast.create({
          message: "Upload fail, something wrong. Please try again later!"
        });
        toast.present();
      });
    }
     else {
      let form = 'sum='+this.bh.sotien+
          '&duration='+this.bh.songay+
          '&cycle='+this.bh.chuki+
          '&rate='+this.bh.chiphi+
          '&name='+this.bh.tenkhach+
          '&type='+'2'+
          '&phone='+this.bh.sdt+
          '&address='+this.bh.diachi+
          '&identity='+this.bh.cmt+
          '&note='+this.bh.ghichu+
          '&property='+this.bh.taisan
      ;

        let u = this.url+this.token+'&branch='+this.br;
        this.postf.postTo(u,form,'').then(log =>{
          console.log(log);
          if(log.status == 1){
            window.location.reload();
          } else {
            let toast = this.toast.create({
              message:  "Something wrong ...",
              duration: 1500,
              position: "middle"
            }) ;
            toast.present();
          }
      });
    }

  }

  taiAnh(){
    let u = this.urlUpload+this.token+'&branch='+this.br;
    
    if(this.platform.is('android')){
       this.filechoose.open().then(uri =>{
        // loading.present();
        // console.log("ss");
        this.uri = uri;

      }).catch(e => console.log(e));
    }
   
  }

}
