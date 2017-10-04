import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddStaffPage } from './add-staff/add-staff';
import { ListStaffPage } from './list-staff/list-staff';

/**
 * Generated class for the StaffPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html',
})
export class StaffPage {

	addstaff: any = AddStaffPage;
	liststaff: any = ListStaffPage;

	constructor(public navCtrl: NavController, public navParams: NavParams) {

	}

	ionViewDidLoad() {
	   console.log('ionViewDidLoad StaffPage');
	}

}
