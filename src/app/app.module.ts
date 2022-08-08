import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';



import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ItemPage } from '../pages/Item/Item';
import { AddItemsPage } from '../pages/add-items/add-items';
import { EditItemPage } from '../pages/edit-item/edit-item';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { SignPage } from '../pages/sign/sign';
import { SignupPage } from '../pages/signup/signup';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { FIREBASE_CREDENTIALS } from './firebase.credential';
import { AuthData } from '../providers/auth-data';
import * as firebase from 'firebase';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ViewItemPage } from '../pages/view-item/view-item';
import { LocalStorage } from '../service/localStorage.service';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { ResetPage } from '../pages/reset/reset';


@NgModule({
  declarations: [
    MyApp,
    ItemPage,
    AddItemsPage,
    EditItemPage,
    HomePage,
    SearchPage,
    SignupPage,
    ResetPasswordPage,
    ViewItemPage,
    SignPage,
    CreateAccountPage,
    ResetPage


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
    ResetPasswordPage,
    ViewItemPage,
    SignupPage,
    CreateAccountPage,
    ResetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthData,
    LocalStorage,



  ]
})
export class AppModule { }
