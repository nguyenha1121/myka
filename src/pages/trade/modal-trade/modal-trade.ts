import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'modal-trade',
  templateUrl: 'modal-trade.html',
})
export class TradeModal {

	data:any;
	constructor(public navParams: NavParams,
			public viewCtrl: ViewController
		){
		this.data = this.navParams.get("param");
		this.data = this.data.data;
		console.log(this.data);
		// this.so_tien = this.data.data.mon_vay.so_tien;
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}
}