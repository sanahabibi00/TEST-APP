import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '../models/interfaces/User';
import { LocalStorage } from '../service/localStorage.service';
import { NavController ,AlertController ,LoadingController, ToastController, NavParams} from 'ionic-angular';




@Injectable()
export class AuthData {
  public data: any;
  public fireAuth: any;
  public userProfile: any;
  loading: any
  constructor(private local: LocalStorage,public navCtrl: NavController,
   public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/users');
  }

  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string): Promise<any> {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    
    debugger
    return   firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      debugger
      this.loadingCtrl.create().dismiss().then(() => {
        console.log("onlogin", result)
        this.SetUserData(result);

      }); 
        
      this.loading.dismiss();}
      ,
      error=>{
        this.loadingCtrl.create().dismiss().then(() => {
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
      this.loading.dismiss(); })
   
  }
  SetUserData(user) {
    this.local.saveLoginData('email', user.email)
    this.local.saveLoginData('uid', user.uid)
  }

  signupUser(account: {}): any {
    return firebase.auth().createUserWithEmailAndPassword(account['email'], account['password']).then((newUser) => {
      debugger
      this.fireAuth.signInWithEmailAndPassword(account['email'], account['password']).then((authenticatedUser) => {
        this.userProfile.child(authenticatedUser.uid).set(
          account
        );
      });

    });
  }

  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email: string): Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser(): Promise<any> {
    window.sessionStorage.clear();
    this.local.removeData('email')
    this.local.removeData('uid')

    return firebase.auth().signOut();

  }

}
