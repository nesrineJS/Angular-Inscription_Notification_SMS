
import { Component, OnInit, ViewEncapsulation, ViewChild,Inject, Input, HostListener, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { FormsService } from './forms.service';
enum CheckBoxType { MODIFY_MARIE, MODIFY_CELEBATAIRE, NONE };
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
//import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/distinctUntilChanged';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material';



@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {

  state:any;
  
  values = '';
  valueskey ='';

  codeInscription:any;
  fullname:any;
  msisdn:any;
  service:any;
  civility:any;
  job:any;
  gender:any;
  param_1:any;
  param_2:any;
  param_3:any;
  param_4:any;
  language:any;
  city:any;
  zip_code:any;
  date_birth = ""; 

  code:any;
  id_code:any;
  countries:any;
  libelle:any;

  code_check:any;
  code_msisdn:any;


  InscriptionBack : boolean= false;
  InscriptionCode : boolean=false;

  value = 1;

  _code:any;
  _msisdn:any;
  closeResult: string;

  animal: string;
  name: string;
  codeObj:any;

  cdt1:boolean 
  cdt2:boolean 
  cdt3:boolean 
  nettoyage_msg ="";
  texterr ="";

  scrolldelay:any;
 
  value1:any;
  value2:any;
  value3:any;
  value4:any;

  msisdn1:any;
  msisdn2:any;
  msisdn3:any;
  valueList=[''];
  allZipCode:any;
  allMobile:any;
  indicatif='216';
  allMobileCheck:any;

  InscriptionBtn:boolean;
  @Input() checked: boolean
  checkedVariable =  true;
  fieldvalue:any;
  isDisabled: boolean=false;
  clicked :boolean;

  lstConditionChecked: string =";YES_USE_DATA;YES_PUB_SMS;"

  /************ Checked Form ************ */

   isGenderChecked: boolean = false;
   isSecteurChecked: boolean = false;
   isUseConditionChecked: boolean = true;
   isMessageHidden: boolean = true;
   verifCode: boolean =false;
   isCodeMessageHidden : boolean =true; 
   isCodeAlertMessageHidden: boolean = true;


  /************ Checked Form ************ */


  confirmHidden: boolean = false;
  
  titleHidden : boolean =false;
  testHidden: boolean =false;

  month :any;
  day:any;
  year:any;

  StorageMsisdn :any;
  MsgAlert:any;
  isMessageAlert : boolean =false;
  isBtnInscription :boolean =true;
  isRecaptachHidden :boolean =false;


  /******************CAPTCHA VARIABLES********************** */
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  public useGlobalDomain: boolean = false;
  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';
  public aFormGroup: FormGroup;
  public readonly siteKey = '6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1'; 

  //6LctVb8UAAAAAD9uZP3dqx6JsOGVd4NPMZlGNuj7 key de serveur de production de horoscopi.tn
  // 6Lcr4r4UAAAAANzv27RWu2c8c2uVsoKnXcq0Rnip key pour--horoscope sur serveur de test
   // 6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1 key pour--horoscope sur le local
  
  constructor(private fb: FormBuilder, private rest: FormsService, private datePipe: DatePipe,public dialog: MatDialog, 
    public router: Router ,public cdr: ChangeDetectorRef, public formBuilder: FormBuilder) {
    window.setInterval(()=>this.checkedVariable=!this.checkedVariable, 3600000);
    var elementMsisdn = localStorage.getItem('StorageMsisdn');
    if(elementMsisdn && elementMsisdn.length > 7 )
    {
      this.router.navigate(['/confirmation'])
    } 
  }

    
    ngOnInit() {

      this.aFormGroup = this.formBuilder.group({
        recaptcha: ['', Validators.required]
      });

      this.isGenderChecked = false;
      this.isSecteurChecked = false;
      this.isUseConditionChecked = true;
      this.isMessageHidden = true;

      
    }

    refresh(): void {
      if(this.code_check == this.id_code){

      // console.log('id_code :'+this.id_code);
       //console.log('code_check :'+this.code_check);

        setTimeout(function(){ location.reload(); }, 180000); //180000
     }
   }

   
    GenderRadioButtonChange(gender){
       this.gender=gender;

       this.isGenderChecked = true;

       console.log('gender: '+this.gender)
    }


    UseConditionCheckBoxChange(event){
      
      if(event.target.checked)
      {
        this.isUseConditionChecked = true;
      }
      else
      {
        this.isUseConditionChecked = false;
      }

      //console.log(this.isUseConditionChecked)
   }

   ConditionChechBoxChange(chkCondition, event)
   {
     if(event.target.checked)
     {
       this.lstConditionChecked = this.lstConditionChecked + chkCondition + ";"
     }
     else
     {
       this.lstConditionChecked = this.lstConditionChecked.replace(chkCondition + ";", "") 
     }

 
     //console.log(this.lstConditionChecked);
   }

 
    GetZipCode(value1, value2, value3, value4){
      this.allZipCode=value1+value2+value3+value4
     

    }


    GetMobile(msisdn){
      this.allMobile =this.indicatif +msisdn;
      //console.log('mobile completed: '+this.allMobile)


    }
 

    GetInscriptionInsert(gender,cd1)  {
      
     // console.log("INSERTION EFFECTUER");
      this.service='horoscope'
      this.state='';
      this.job='';
      this.param_1='';
      this.param_2='';
      this.param_3= this.lstConditionChecked;
      this.param_4='';
      this.language ='';


    //  let dateConvert = new Date(this.date_birth).toISOString();

      
      this.code_msisdn = this.allMobile;

      this.rest.InscriptionInsert(this.fullname,this.allMobile,this.service,this.state,this.job,gender, this.param_1, 
          this.param_2, this.param_3, this.param_4,this.language,this.city,this.zip_code, this.date_birth).subscribe(respond => {
           console.log(respond);

          // console.log('this'+new Date(this.date_birth).toISOString().split('')[0])
           console.log('DATE BIRTH :'+ this.date_birth);
     

           if( respond.length > 0){
            this.id_code=respond[0].id_code;
            this.msisdn=respond[0].msisdn;

            this.StorageMsisdn =respond[0].msisdn;

            localStorage.setItem('StorageMsisdn',JSON.parse(this.StorageMsisdn));

          this.rest.SendCodeBySMS(respond[0].msisdn,respond[0].id_code , respond[0].id_inscription).subscribe(respond2 => {      

          });  

          var elementMsisdn = localStorage.getItem('StorageMsisdn');

          this.router.navigate(['/confirmation']);
          window.scroll(0, 500);


          /*if(respond[0].id_code !=  0)
          {
            console.log("id_code exists")
            this.isMessageHidden = false;

          }
          else{
            console.log("id_code DOES NOT exists")
            this.isMessageHidden = true;


          }*/
        }else {
          
             this.isMessageAlert =true;
          //  console.log(this.isMessageAlert)
            this.MsgAlert ='رقم الجوال مسجل في الخدمة !';
           // console.log('already there')
          } 
        });
     
    } 


    GetCodeCheck2(code,mobile)  {
      

      this.rest.CodeCheck(code,mobile).subscribe(respond => {

        //console.log('res: '+JSON.stringify(respond));

        if(respond[0].pr_inscription_check == 1)
        {

          this.isCodeMessageHidden= false;
          this.confirmHidden = false; 
          this.isCodeAlertMessageHidden = true;
      
        }
        else
        {
          this.isCodeAlertMessageHidden = false;
          
        }

      });


      this.InscriptionCode =true;
    
    }
      
    ChangeCodeText()
    {
      this.isCodeAlertMessageHidden = true;
    }

    show(state){
      //console.log(state)
    }


    GetCountrySearch(event: any)  {
    
          
       this.rest.CountrySearch( this.values+event.target.value ).subscribe(respond => {
         this.countries=respond;
       
       })
     }

    selectedCity(libelle){
     this.libelle = libelle
    }


    public inputValidator(event: any) {
       const pattern = /^[a-z\d\-_\s]+$/i;   

      if (!pattern.test(event.target.value)) { 
        event.target.value = event.target.value.replace(/^[a-z\d\-_\s]+$/i, "");

  
      }
    }

    public inputValidators(event: any) {
      const pattern = /^[0-9]*$/;   
      if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
  
      }
    }

    OnlyNumbers(event): boolean {    
      let patt = /^([a-z A-Zأ-ي])$/;
      let result = patt.test(event.key);
      return result;

  }


    /******************************************CAPTCHAA**********************************************************/

    handleReset(): void {
      this.captchaSuccess = false;
      this.captchaResponse = undefined;
      this.captchaIsExpired = false;
      this.cdr.detectChanges();
    }

    handleExpire(): void {
      this.captchaSuccess = false;
      this.captchaIsExpired = true;
      this.cdr.detectChanges();
    }
  
    handleLoad(): void {
      this.captchaIsLoaded = true;
      this.captchaIsExpired = false;
      this.cdr.detectChanges();
    }
  

    handleSuccess(captchaResponse: string): void {
      this.captchaSuccess = true;
      this.captchaResponse = captchaResponse;
      this.captchaIsExpired = false;
      this.cdr.detectChanges();
     // console.log('recaptcha clicked and verified !');
      this.isBtnInscription =false;
      this.isRecaptachHidden =true;

    }
   

  
}

