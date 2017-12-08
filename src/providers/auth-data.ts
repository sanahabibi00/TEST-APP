import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class AuthData {
  public data:any;
  public fireAuth:any;
  public userProfile:any;
  constructor() 
  
{
  this.fireAuth = firebase.auth();
  this.userProfile = firebase.database().ref('/users');
}

  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string):Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
    
  }

  signupUser(account:{}):any {
      return firebase.auth().createUserWithEmailAndPassword(account['email'],account['password']).then((newUser) => {
        this.fireAuth.signInWithEmailAndPassword(account['email'],account['password']).then((authenticatedUser) =>{
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
  resetPassword(email: string):Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser():Promise<any> {
    return firebase.auth().signOut();
  }

}
