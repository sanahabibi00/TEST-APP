import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Items} from '../../model/Items/Items.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Camera } from 'ionic-native';
import firebase from 'firebase';
import { LocalStorage } from '../../service/localStorage.service';
import { ItemPage } from '../Item/Item';
@Component({
  selector: 'page-add-items',
  templateUrl: 'add-items.html',
})
export class AddItemsPage {
  
  items = {} as Items;
  itemsRef$: FirebaseListObservable<Items[]>

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  userEmail: string;
  uid: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,
    private local:LocalStorage,public toastController: ToastController) {
  this.itemsRef$ = this.database.list('item');
  this.myPhotosRef = firebase.storage().ref('/Photos/');
  
  }
  ngOnInit(){
    this.userEmail = this.local.getData('email');
    this.uid = this.local.getData('uid');
    console.log("localemail",this.userEmail)
    console.log("localuid",this.uid)
  }

  takePhoto() {
    debugger
    Camera.getPicture({
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhoto(): void {
    debugger
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
  }

  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  private generateID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-xxx-xxx'.replace(/[x]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }







addItems(items: Items) {
this.itemsRef$.push({
  itemName: this.items.itemName,
  itemStatus: this.items.itemStatus,
  itemOwner:this.userEmail,
  itemImage:this.myPhotoURL,
  itemID : this.items.itemName+'/'+ this.generateID(),
  uid: this.uid
  
});
this.items = {} as Items;
this.presentToast()
this.navCtrl.pop();
this.navCtrl.push(ItemPage)

}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Item Added Successfully.',
    duration: 2000
  });
  toast.present();
}
}
