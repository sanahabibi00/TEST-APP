
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Subject } from 'rxjs/Subject';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { ItemPage } from '../Item/Item';
import { HomePage } from '../home/home';
import { AuthData } from '../../providers/auth-data'
import * as firebase from 'firebase';
import { Items } from '../../model/Items/Items.interface';
import { ViewItemPage } from '../view-item/view-item';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  itemListRef$: FirebaseListObservable<Items[]>
  public itemList: Array<any>;
  public loadeditemList: Array<any>;
  public itemRef: firebase.database.Reference;
  loading: any;

  constructor(public loadingCtrl: LoadingController, public authData: AuthData, public navCtrl: NavController, public navParams: NavParams,
    private af: AngularFireDatabase, private actionsheetctrl: ActionSheetController) {
    this.itemRef = firebase.database().ref('/item');

    this.itemRef.on('value', itemList => {
      let items = [];
      itemList.forEach(item => {
      console.log(item.val());
      items.push(item.val());
        return false;
      });

      this.itemList = items;
      this.loadeditemList = items;
    });


  }
  viewItem(items: Items) {
    this.actionsheetctrl.create({
      title: `${items.itemName}`,
      buttons: [
        {
          text: 'View',
          handler: () => {
 
    
            this.navCtrl.push(ViewItemPage, { ItemsId: items.$key });
          }
        },


      ]
    }).present();
  }



  logOut() {
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(HomePage);

    });
  }


  initializeItems(): void {
    this.itemList = this.loadeditemList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      return Error;
    }

    this.itemList = this.itemList.filter((v) => {
      if (v.itemName && q) {
        if (v.itemName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.itemList.length);

  }




  navigateToItemList() {
    this.navCtrl.push(ItemPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
