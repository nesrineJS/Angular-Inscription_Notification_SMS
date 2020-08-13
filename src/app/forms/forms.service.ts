import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  url= environment.Baseurl;
  headers = new Headers();

 
  constructor (private http: Http) {}


  InscriptionInsert (fullname,msisdn,service,civility,job,gender,param_1, param_2, param_3, param_4,lang,city,zip_code, date_birth): Observable<any[]> {
    this.headers.append('Content-Type', 'application/json');

        return this.http
        .put(this.url+'inscriptionHoroscope',{fullname,msisdn,service,civility,job,gender,param_1, param_2, param_3, param_4,lang,city,zip_code, date_birth})
        .map(this.extractData);
  }

  SendCodeBySMS (msisdn,code,id_inscription) {
    this.headers.append('Content-Type', 'text/xml');

    var textSMS = 'رمز التأكيد: %CODE% . أو عن طريق: http://horoscopi.tn/c/%CODE%-%INSCRIPTION%';
    textSMS = textSMS.replace('%CODE%',code);
    textSMS = textSMS.replace('%CODE%',code);
    textSMS = textSMS.replace('%INSCRIPTION%',id_inscription);

        return this.http
        .get('http://188.165.230.52/bulksmsjob/client/Api/Api.aspx?fct=sms&key=VHk0iT/-/JmXHNCRj69J3U3l3e3TElFktzpdK5NrFHuapTaHX9UgAQCVMy3/-/kPJFDjZm/-/G5XNahER/IDxz/-/MkFEISC4b5zY4kz&mobile='+msisdn+'&sms='+textSMS+'&sender=imentest');
       // .get('https://www.tunisiesms.tn/client/Api/Api.aspx?fct=sms&key=BkhDph6n1ndu1dypaMILdJwQTY8UTiWvZ3/-/L3ydMZNK6Fv0WDLgyaf1UZh9NXQJaZe43w53Br/-/FfO6HPmVmLjsl/-/7YM9IRM4&mobile='+msisdn+'&sms='+textSMS+'&sender=Horoscopi');
      }

  CodeConfirmBySMS (msisdn) {
    this.headers.append('Content-Type', 'text/xml');

    return this.http
    .put(this.url+'codeConfirm',{msisdn})
    .map(this.extractData);
  }


  ResendCode (msisdn): Observable<any[]> {
    this.headers.append('Content-Type', 'application/json');

        return this.http
        .put(this.url+'codeResend',{msisdn})
        .map(this.extractData);
  }


  CodeCheck (code,msisdn): Observable<any[]> {

    this.headers.append('Content-Type', 'application/json');
    //console.log(msisdn);
        return this.http
        .put(this.url+'codeCheck',{code,msisdn})
        .map(this.extractData);
  }


  CheckInscription(id_code, id_inscription){
    this.headers.append('Content-Type', 'application/json');
    return this.http
    .put(this.url+'codeCheckT2',{id_code, id_inscription})
    .map(this.extractData);
  }
    
  CountrySearch (libelle): Observable<any[]> {
    this.headers.append('Content-Type', 'application/json');


      return this.http
      .put(this.url+'search',{libelle})
      .map(this.extractData);
  }

  
  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

}