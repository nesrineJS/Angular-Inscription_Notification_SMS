import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms/forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  isCodeMessageHidden : boolean =true; 
  confirmHidden: boolean = false;
  isCodeAlertMessageHidden: boolean = true;
  InscriptionCode : boolean=false;


  mobileIndicatif= "216";
  msisdn :any;

  id_code:any;


  constructor(public rest: FormsService, public router: Router) {

    var elementMsisdn = localStorage.getItem('StorageMsisdn');
    if(localStorage.getItem('StorageMsisdn'))
    {
      this.msisdn=JSON.parse(localStorage.getItem('StorageMsisdn')).toString();

      if(this.msisdn && this.msisdn.length == 11 && (this.mobileIndicatif) ==  (this.msisdn.substring(0,3))){
        this.msisdn =this.msisdn.substring(3);
      }
    }
  }

  ngOnInit() {  
  }

  GetCodeCheck2(id_code, msisdn)  {

      
    var mobile = msisdn;
  
  if(msisdn.length == 8)
  {
      mobile = '216' + mobile;
  }

    this.rest.CodeCheck(id_code.toString(),mobile.toString()).subscribe(respond => {

      console.log('res :'+ JSON.stringify(respond))

      if(respond[0].pr_inscription_check == 1) 
      {
        this.isCodeMessageHidden= false;
        this.confirmHidden = false; 
        this.isCodeAlertMessageHidden = true;
        localStorage.clear();
        setInterval(() => {
          this.router.navigate(['/services/'])
          }, 30000);
          window.scroll(0, 500);

          
      }
      else
      {
        this.isCodeAlertMessageHidden = false;
      }

    });
    
    this.InscriptionCode =true;
  }

  ResendCode(){

    if(this.msisdn && (this.msisdn.length == 8 || this.msisdn.length == 11) )
    {
      
      var mobile = this.msisdn;
      
      if(this.msisdn.length == 8)
      {
          mobile = '216' + mobile;
      }
      
      this.rest.ResendCode(mobile.toString()).subscribe(respond => {
        //console.log(respond)
              if(respond && respond.length > 0)
              {
                this.rest.SendCodeBySMS(mobile.toString(), respond[0].id_code , respond[0].id_inscription).subscribe(respond2 => {   
                }); 
              }
        }); 
      }  
    } 

  NewInscription(){
    localStorage.clear();
    this.router.navigate(['/inscription']);
    window.scroll(0, 500);
  }
}
