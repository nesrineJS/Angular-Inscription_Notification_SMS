import { BrowserModule } from '@angular/platform-browser';
import { NgModule,forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule,NG_VALUE_ACCESSOR } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {NgxMaskModule, IConfig} from 'ngx-mask'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatListModule,
  MatDialogModule
 } from '@angular/material';


import { FormsComponent } from './forms/forms.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsService } from './forms/forms.service';
import { BDirModule } from 'ngx-bdir';
import {DatePipe} from '@angular/common';
import { PolitiquesComponent } from './politiques/politiques.component';
import { TermesComponent } from './termes/termes.component';
import { LinkComponent } from './link/link.component';
import { ServicesComponent } from './services/services.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NgxCaptchaModule } from 'ngx-captcha';




export const options: Partial<IConfig> | (() => Partial<IConfig>) = {}

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    PolitiquesComponent,
    TermesComponent,
    LinkComponent,
    ServicesComponent,
    NotFoundComponentComponent,
    ConfirmationComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    BDirModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    HttpClientModule,
    HttpModule,
    MatListModule,
    MatAutocompleteModule  ,
    NgxCaptchaModule,
    NgxMaskModule.forRoot(options) ],



  providers: [FormsService,DatePipe],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
