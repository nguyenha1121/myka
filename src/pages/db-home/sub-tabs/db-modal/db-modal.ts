import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';

import { GetJsonProvider } from '../../../../providers/get-json/get-json';

/**
 * Generated class for the LendingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'db-modal',
  templateUrl: 'db-modal.html',
})
export class DbModal {

  public data;
  public enableEdit=false;
  private url = "assets/ex.json";
  public readonly="";
  constructor(
    public navParams: NavParams,
    public getj: GetJsonProvider,
    public ViewCtrl: ViewController
  ) {
    this.ViewCtrl = ViewCtrl;
    this.data = this.navParams.get('param');
    console.log(this.data);
    // this.data = 'aaaa';
  }

  ionViewDidLoad() {
  }

  dismiss(){
    this.ViewCtrl.dismiss();
  }

  toArray(string){
    return (JSON.parse(string));
  }

  //////////////////////events
  editEnable(){
    this.enableEdit = !this.enableEdit;
    this.readonly = "readonly";
  }

}
