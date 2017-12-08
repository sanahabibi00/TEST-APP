import { Component  } from '@angular/core';
import { NavController ,AlertController ,LoadingController, ToastController, NavParams} from 'ionic-angular';

import * as firebase from 'firebase';
import {SearchPage} from '../search/search';
import  {HomePage} from '../home/home';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../reset-password/reset-password';


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
  public users: AuthData, public nav: NavController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
  });

  }
  logForm(): void {
    if (!this.loginForm.valid) {
        console.log(this.loginForm.value);
    } else {
        this.users.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
            this.loading.dismiss().then(() => {
                this.navCtrl.setRoot(SearchPage);
            });
        }, error => {
            this.loading.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                    message: error.message,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
        });

        this.loading = this.loadingCtrl.create();
        this.loading.present();
    }
}


goToResetPassword(): void {
    this.nav.push(ResetPassword);
}
}
