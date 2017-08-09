import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';

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

  constructor(public filechoose: FileChooser ,public navCtrl: NavController, public navParams: NavParams) {
    this.filechoose = filechoose;
  }

  cd = {};

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CamDoPage');
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
