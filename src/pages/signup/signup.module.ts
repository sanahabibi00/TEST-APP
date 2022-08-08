import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SignupPage,
  ],
 
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule {}
