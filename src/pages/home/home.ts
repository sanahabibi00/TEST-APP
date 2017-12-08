import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchPage} from '../search/search';
import  {SignPage} from '../sign/sign';
import {Signup} from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  navigateToSign(){
    this.navCtrl.push(SignPage);
  }
  navigateToRegister(){
    this.navCtrl.push(Signup);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
