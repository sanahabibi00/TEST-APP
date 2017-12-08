import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {SignPage} from '../pages/sign/sign';
import {HomePage} from '../pages/home/home';
import {SearchPage} from '../pages/search/search';
import firebase from 'firebase';
import {AddItemsPage} from '../pages/add-items/add-items';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = SearchPage;

  constructor(public platform:Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
         
    var config ={
      
      
        apiKey: "AIzaSyAHbQ0eQaUvgOw4TlIcnITjZkSvVYHlmh4",
        authDomain: "crudapp-ac3dd.firebaseapp.com",
        databaseURL: "https://crudapp-ac3dd.firebaseio.com",
        projectId: "crudapp-ac3dd",
        storageBucket: "crudapp-ac3dd.appspot.com",
        messagingSenderId: "520433913400"
          
        };
        
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => {
          
                    if (!user) {
                        console.log("not login");
                        this.rootPage = SearchPage;
          
          
                    } else {
                        console.log("login");
                        this.rootPage = SearchPage;
          
                    }
          
                });
          
      












   
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  }


