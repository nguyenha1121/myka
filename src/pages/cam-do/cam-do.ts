import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

// import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';

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
  public token;
  public br;
  public log;
  imgs = [];
  time= true;
  bug = null;
  public url = "http://app.onbank.vn/api/loan/save?API_TOKEN=";
  public urlUpload = "http://app.onbank.vn/api/upload?API_TOKEN=";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public store: Storage, public postf: PostFormProvider, public fileTranfer : FileTransfer,public imagePicker: ImagePicker,
    public service: ServiceProvider, public toast: ToastController) {
    // this.filechoose = filechoose;
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

  imgsw = [];

  async upt(img){
    var link = this.urlUpload+this.token+'&branch='+this.br;
    await this.upload.upload(img,link).then((suc) =>{
      // this.bug = suc;
      this.bug = 0;
      if(Array.isArray(JSON.parse(suc.response))){
        this.bug = 1;
        this.imgsw.push(JSON.parse(suc.response)[0]);
      } 
      
    });
  }

  async save(){
    // console.log("save");
    if(!this.time){
      return '';
    }
    this.time = false;
    this.toast.create({
        message:  "Saving...",
        duration: 2500,
        position: "middle"
      });
    if(this.imgs.length > 0 ){
      for( let i = 0; i< this.imgs.length; i++){
          await this.upt(this.imgs[i]);
      }  
      this.log = JSON.stringify(this.imgsw);
      let form = 'sum='+this.cd.sotien+
          '&duration='+this.cd.songay+
          '&cycle='+this.cd.chuki+
          '&rate='+this.cd.chiphi+
          '&name='+this.cd.tenkhach+
          '&type='+'1'+
          '&image-url='+this.log+
          '&phone='+this.cd.sdt+
          '&address='+this.cd.diachi+
          '&identity='+this.cd.cmt+
          '&cat-truoc='+this.cd.cattruoc+
          '&note='+this.cd.ghichu+
          '&property='+this.cd.taisan
      ;
      this.bug = form;
        let u = this.url+this.token+'&branch='+this.br;
        this.postf.postTo(u,form,'').then(log =>{
          console.log(log);
          if(log.status == 1){
            let a = this.toast.create({
              message:  "Success",
              duration: 500,
              position: "middle"
            });
            a.present();
            window.location.reload();
          } else {
            let a = this.toast.create({
              message:  "Something wrong ...",
              duration: 1500,
              position: "middle"
            });
            a.present();
            this.time = true;
          }
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
            let toast = this.toast.create({
              message:  "Something wrong ...",
              duration: 1500,
              position: "middle"
            }) ;
            toast.present();
            this.time = true;
          }
      });
    }
  }
 taiAnh(){
   this.imgs = [];
     this.imagePicker.getPictures({outputType: 0,maximumImagesCount: 5
     }).then((results) => {
        for (var i = 0; i < results.length; i++) {
            this.imgs.push(results[i]);
        }
      }, (err) => { });
  }

}
