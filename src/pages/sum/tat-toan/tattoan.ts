import { Component } from '@angular/core';
import {  ViewController, NavParams, ModalController } from 'ionic-angular';

import { PostFormProvider } from '../../../providers/post-form/post-form';

@Component({
  selector: 'tattoan',
  templateUrl: 'tattoan.html',
})

export class TatToanModal{

	data;
	api;
	br;
	now = 0;
	url = "http://app.onbank.vn/api/loan/complete?API_TOKEN=";
	tt = {
		block: 0,
		tonglai: 0,
		thucte: 0
	};
	time = true;

	constructor(
		public viewCtrl: ViewController,
		public navParams: NavParams,
		public postf: PostFormProvider,
		){
		this.viewCtrl = viewCtrl;
		this.data = this.navParams.get('data');
		this.api = this.navParams.get('api');
		this.br = this.navParams.get('br');
		let lnow = new Date();
		this.now = lnow.getTime() /(1000);
		this.now = Math.floor(this.now);
		// console.log(this.data);
		// this.getDif(1503657182);
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}	
	tattoan(){
		if(this.time == true){
			// console.log(this.tt);
			let u = this.url+this.api+"&branch="+this.br;
			let form = "id="+this.data.id+
						"&total="+this.tt.thucte;
			this.postf.postTo(u,form,"").then(result => {
				// console.log(result);
				window.location.reload();
			});
			this.time = false;
		}
		
	}
	secBlock(val:any){
		// console.log(val);
		// console.log(this.tt.block);
		this.getTonglai();
		this.canDong();
	}
	getDif(time){
		let dif = this.now - time;
		if(dif<=0){
			return -1;
		} else {
			let day = Math.floor(dif/(60*60*24))+1 ;
			// console.log(day);
			return day;
		}
	}
	getTonglai(){
		let tl ;
		if(this.tt.block*this.data.chu_ky > this.getDif(this.data.tao_luc)){
			tl = this.tt.block*this.data.chu_ky*this.data.chi_phi;
		} else {
			tl = this.getDif(this.data.tao_luc)*this.data.chi_phi;
		}
		this.tt.tonglai = tl;
		// console.log(this.tt.tonglai);
		return tl
	}
	dadong(lichthu){
		let thu = JSON.parse(lichthu);
		let out = 0;
		for(let k = 0; k<thu.length; k++){
			out += thu[k].sotien;
		}
		return out;
	}
	parseNum(num){
		let out = "";
		for(let i = 0; i<num.length; i++ ){
			if(num[i] != "."){
				out += num[i];
			}
		}
		return Number(out);
	}
	tinhtrang(){
		if (this.getDif(this.data.tao_luc) < this.data.thoi_gian) {
			return true;
		} return false;
	}
	dq(n,a){
	    if(n <=0){
	      return a;
	    } else {
	      let d = this.dq(Math.floor(n/1000),a);
	      if(n%1000 > 99){
	        a += String(n%1000);
	      } else if(n%1000 > 9){
	        a += '0';
	        a += n%1000;
	      } else {
	        a += '00';
	        a += n%1000;
	      }
	      return d +'.'+ a;
	    }
  	}

	  styleNumber(number){
	    number = Math.floor(number);
	    let out='';
	    out = this.dq(number,'');
	    out = out.slice(1);
	    while(out[0] == '0'){
	      out = out.slice(1);
	    }
	    if(out == ''){
	    	return "0";
	    }
	    return out;
	  }
	canDong(){
		let out = this.parseNum(this.data.so_tien) + (this.getTonglai() - this.dadong(this.data.lich_thu));
		this.tt.thucte = out;
		return out;
	}
}