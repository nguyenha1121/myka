import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';

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
  public filepath ;
  public uploadUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, public getj: GetJsonProvider, public store: Storage,
     public filechoose: FileChooser, public upload : FileTransfer) {
    this.filechoose = filechoose;
    this.upload = upload;
    // this.getj = getj;
    // this.store = store;
    // this.store.get('API_Token').then(token=>{
    //   this.getj.load('http://thuviensofl.xyz/api/customer/list',token).then(data=>{
    //     console.log(data);
    //   })
    // });


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
      this.filepath = uri;
    }).catch(e => console.log(e));
  }
  // uploadImage(){
  //   this.fileTransfer.upload(this.filepath,this.uploadUrl );
  // }
  clickme(){
    // this.navCtrl.push(DetailPage,{'late-time':'your face'},{duration:1}).then(()=>{
    //   this.navCtrl.remove(this.navCtrl.getActive().index - 1 ,1);
    // });
    this.ab= 10;
    for(let i = 1;i<10000;i++){
      this.ab = i;
    }
    this.ab = 100;
  }

  ionViewDidLoad() {

  }

}
