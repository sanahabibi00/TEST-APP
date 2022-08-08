import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams,ToastController  } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { SearchPage } from '../search/search';

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
  providers:[AuthData]
})
export class CreateAccountPage {
   public createAccountForm
    loading: any;
   
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authData: AuthData,public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,public toastController: ToastController) {

            this.createAccountForm = formBuilder.group({
                email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
                number:['', ],
                displayName:['', ]
            });
  }

  signupUser(){
    var account = {
        displayName:this.createAccountForm.value.displayName,
        email:this.createAccountForm.value.email,
        phone:this.createAccountForm.value.number,
        password:this.createAccountForm.value.password
    };
    if (!this.createAccountForm.valid) {
        console.log(this.createAccountForm.value);
    } else {
        this.authData.signupUser(account).then(() => {
                this.loading.dismiss().then(() => {
                    this.navCtrl.setRoot(SearchPage);
                });
            }, (error) => {
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
        this.presentToast()
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your Account have been created.',
      duration: 2000
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

}
