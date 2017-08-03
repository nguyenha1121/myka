import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http';
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
  postTo(form){
    let url = 'http://thuviensofl.xyz/api/staff/login';
    if(this.data){
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      let iheader = new Headers({
        // 'TOKEN': 'abc',
        'Content-Type':'application/json',
        'API_TOKEN':''
      });
      let options = new RequestOptions({
        headers: iheader,
      });

      let info = {
        'username': form.user,
        'password': form.password
      };
      console.log(info);
      let infos = JSON.stringify(info);
      this.http.post(url,infos,options)
      .map(res=>res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    })
  }

}
