import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams ,ToastController, Platform, LoadingController} from 'ionic-angular';
// import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';

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
  imgs = [];
  public url = "http://app.onbank.vn/api/loan/save?API_TOKEN=";
  public urlUpload = "http://app.onbank.vn/api/upload?API_TOKEN=";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public store: Storage, public postf: PostFormProvider, public fileTranfer : FileTransfer,
    public platform: Platform,public loading: LoadingController,public imagePicker: ImagePicker,
    public service: ServiceProvider, public toast: ToastController) {
    // this.filechoose = filechoose;
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


  imgsw = [];

  async upt(img){
    var link = this.urlUpload+this.token+'&branch='+this.br;
    await this.upload.upload(img,link).then((suc) =>{
      this.imgsw.push(JSON.parse(suc.response));
    });
  }

  async save(){
    // console.log(this.bh);
    this.imgsw = [];
    let toast = this.toast.create({
        message:  "Saving...",
        duration: 2500,
        position: "middle"
      });
    toast.present();
    if(this.imgs.length > 0 ){
        for( let i = 0; i< this.imgs.length; i++){
          await this.upt(this.imgs[i]);
        }
        this.log = JSON.stringify(this.imgsw);
        let form = 'sum='+this.bh.sotien+
            '&duration='+this.bh.songay+
            '&cycle='+this.bh.chuki+
            '&rate='+this.bh.chiphi+
            '&name='+this.bh.tenkhach+
            '&type='+'2'+
            '&image-url='+this.log+
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
              duration: 1500,
              position: "middle"
            });
            toa.present();
            // window.location.reload();
          } else {
            let  toa = this.toast.create({
              message:  "Something wrong ...",
              duration: 1500,
              position: "middle"
            });
            toa.present();
          }
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
    this.imgs = [];
     this.imagePicker.getPictures({outputType: 0,maximumImagesCount: 5
     }).then((results) => {
        for (var i = 0; i < results.length; i++) {
            this.imgs.push(results[i]);
        }
      }, (err) => { });
  }

}