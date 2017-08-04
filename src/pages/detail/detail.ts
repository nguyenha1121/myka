import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params = this.navParams.get('late-time');
    this.helo = this.params;
    // this.navCtrl.remove();
    for(let i = 1;i<10000;i++){
      this.ab = i;
    }
  }
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
