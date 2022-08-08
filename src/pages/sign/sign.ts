import { Component  } from '@angular/core';
import { NavController ,AlertController ,LoadingController, ToastController, NavParams} from 'ionic-angular';


import {SearchPage} from '../search/search';
import  {HomePage} from '../home/home';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordPage } from '../reset-password/reset-password';


@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
  providers:[AuthData]
})


export class SignPage {
public loginForm;
loading: any;

constructor(public navCtrl: NavController, public navParams: NavParams,
   public formBuilder: FormBuilder,
  public alertCtrl: AlertController, public loadingCtrl: LoadingController,
  public users: AuthData) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
  });

  }
  logForm(): void {
    debugger
    if (!this.loginForm.valid) {
            let alert = this.alertCtrl.create({
                message: 'InValid Credentials',
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
      
    } else {
        this.users.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
           debugger
                this.navCtrl.push(SearchPage);         
        });
   
    }

    console.log("users", this.users)

}


goToResetPassword(){
    debugger
    this.navCtrl.setRoot(ResetPasswordPage);
}
}
