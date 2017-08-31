import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';
import { PostFormProvider } from '../../../providers/post-form/post-form';

@Component({
  selector: 'modal-trade',
  templateUrl: 'modal-trade.html',
})
export class TradeModal {
	api;
	br;
	url = 'http://app.onbank.vn/api/transaction/check?API_TOKEN=';
	data:any;
	constructor(public navParams: NavParams,
			public viewCtrl: ViewController,
			public postf: PostFormProvider
		)
	{
		this.data = this.navParams.get("param");
		this.api = this.navParams.get("api");
		this.br = this.navParams.get("br");
		this.data = this.data.data;
		// console.log(this.data);
		// this.so_tien = this.data.data.mon_vay.so_tien;
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}

	chotso(){
		let tot = 'id='+this.data.id;
		this.postf.postTo(this.url+this.api+'&branch='+this.br,tot,'').then(data=>{
			// console.log(data);
			this.viewCtrl.dismiss();
		});
	}
}