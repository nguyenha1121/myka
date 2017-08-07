export class NumP{
  constructor(){

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
    let out='';
    out = this.dq(number,'');
    out = out.slice(1);
    while(out[0] == '0'){
      out = out.slice(1);
    }
    return out;
  }
  
  dateConvert(date){
    var dt = new Date(date);
    return((dt.getMonth() + 1) + '/' + dt.getDate());
  }
}
