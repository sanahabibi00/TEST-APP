
import { IonicPage, NavParams, NavController,
  LoadingController,
  AlertController } from 'ionic-angular';

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
  providers:[AuthData]
})
export class ResetPage {

  public resetForm;


  constructor(public authData: AuthData, public formBuilder: FormBuilder,
      public navCtrl: NavController, public loadingCtrl: LoadingController,
      public alertCtrl: AlertController) {

      this.resetForm = formBuilder.group({
          email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      })
  }

  /**
   * If the form is valid it will call the AuthData service to reset the user's password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  resetPassword() {
      if (!this.resetForm.valid) {
          console.log(this.resetForm.value);
      } else {
          this.authData.resetPassword(this.resetForm.value.email).then((user) => {
              let alert = this.alertCtrl.create({
                  message: "We just sent you a reset link to your email",
                  buttons: [
                      {
                          text: "Ok",
                          role: 'cancel',
                          handler: () => {
                              this.navCtrl.pop();
                          }
                      }
                  ]
              });
              alert.present();

          }, (error) => {
              var errorMessage: string = error.message;
              let errorAlert = this.alertCtrl.create({
                  message: errorMessage,
                  buttons: [
                      {
                          text: "Ok",
                          role: 'cancel'
                      }
                  ]
              });
              errorAlert.present();
          });
      }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

}
