import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the GetJsonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GetJsonProvider {

  public data;
  public datalogin;
  public log;
  public domain = "http://thuviensofl.xyz";
  constructor(public http: Http ,public store: Storage) {}


  load(url,token) {
    this.data = false;
        if (this.data) {
          return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
          let iheader = new Headers({
            'Content-Type':'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Token': ''
          });
          if(token){
            iheader = new Headers({
              'Content-Type':'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'X-Token': token
            });
          }

          var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          // headers.append('X-Requested-With', 'XMLHttpRequest');
          // headers.append('X-Token', token);
          console.log(token);
          this.http.get(url, {
              headers: headers
            })
            .map(res => res.json())
            .subscribe(data => {
              // console.log(data);
              this.data = data;
              resolve(this.data);
            });
        });

 }

 loadlogin(url,token) {
   this.data = false;
       if (this.data) {
         return Promise.resolve(this.data);
       }

       return new Promise(resolve => {

        let headers = new Headers;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // headers.append('X-Requested-With', 'XMLHttpRequest');
        headers.append('Authorization', 'Bearer'+'ddddddddddddd');
         this.http.get(url, {
           headers: headers
         })
           .map(res => res.json())
           .subscribe(data => {
             // console.log(data);
             this.data = data;
             resolve(this.data);
           });
       });

}

 login(info){
   this.log = false;
  if (this.log) {
    console.log('sss');
    return Promise.resolve(this.log);
  }
  let url = 'http://thuviensofl.xyz/api/staff/list';
  url = this.domain+'/api/staff/login?username='+info.user+'&password='+info.password;
  return new Promise(resolve => {
    let iheader = new Headers({
     //  'TOKEN': 'abc',
      'Content-Type':'application/x-www-form-urlencoded',

    });

    let options = new RequestOptions({
      headers: iheader
    });

    this.http.get(url,options)
      .map(res => res.json())
      .subscribe(data => {
        this.log = data;
        resolve(this.log);
      });
  });
}

 loadListTab(){

   return new Promise(resolve => {
     let iheader = new Headers({
      //  'TOKEN': 'abc',
       'Content-Type':'application/x-www-form-urlencoded'
     });

     let options = new RequestOptions({
       headers: iheader
     });

     this.http.get('assets/loginSuccess.json',options)
       .map(res => res.json())
       .subscribe(data => {
         this.datalogin = data;
        //  console.log(datalogin);
         resolve(this.datalogin);
       });
   });
 }

}
