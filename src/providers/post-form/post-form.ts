import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PostFormProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PostFormProvider {

  constructor(public http: Http) {
    // console.log('Hello PostFormProvider Provider');
  }
  //post login
// public/api/staff/login/ {?username=xx&password=yyy}


  public data;
  public form = '';
  public log;
  postTo(url,form,token){
    // let url = 'http://thuviensofl.xyz/api/staff/login';
    this.data = null;
    if(this.data){
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      if(token==''){
        // headers.append('X-Token', token);
      }
      console.log(form);
      // console.log(tot);
      this.http.post(url,form,{
        headers: headers
      })
      .map(res=>res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    })
  }

}
