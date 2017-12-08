import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';



import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {ItemPage} from '../pages/Item/Item';
import {AddItemsPage} from '../pages/add-items/add-items';
import {EditItemPage} from '../pages/edit-item/edit-item';
import {HomePage} from '../pages/home/home';
import {SearchPage} from '../pages/search/search';
import{SignPage} from '../pages/sign/sign';
import{Signup} from '../pages/signup/signup';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import{FIREBASE_CREDENTIALS} from './firebase.credential';
import { AuthData } from '../providers/auth-data';
import * as firebase from 'firebase';
import {ResetPassword} from '../pages/reset-password/reset-password';
import { ViewItemPage } from '../pages/view-item/view-item';


@NgModule({
  declarations: [
    MyApp,
 ItemPage,
 AddItemsPage,
 EditItemPage,
 HomePage,
 SearchPage,
 Signup,
 ResetPassword,
 ViewItemPage,
 SignPage


  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule
  
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemPage,
  AddItemsPage,
  EditItemPage,
  HomePage,
  SearchPage,
  SignPage,
  ResetPassword,
  ViewItemPage,
Signup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthData
  
   
  ]
})
export class AppModule {}
