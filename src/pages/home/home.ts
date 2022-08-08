import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateAccountPage } from '../create-account/create-account';
import {SearchPage} from '../search/search';
import  {SignPage} from '../sign/sign';
import {SignupPage} from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public nav: NavController,) {
    
  }
  navigateToSign(){
    debugger
    this.navCtrl.push(SignPage);
  }
  navigateToRegister(){
    debugger
    this.navCtrl.push(CreateAccountPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
