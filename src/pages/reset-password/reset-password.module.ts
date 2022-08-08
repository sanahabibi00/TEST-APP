import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ResetPasswordPage } from './reset-password';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
 
  imports: [
    IonicPageModule.forChild(ResetPasswordPage),
  ],
})
export class ResetPasswordPageModule {}
