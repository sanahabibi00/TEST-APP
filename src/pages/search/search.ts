
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
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { LocalStorage } from '../../service/localStorage.service';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers:[AuthData]
})
export class SearchPage {
  itemListRef$: FirebaseListObservable<Items[]>
  public itemList: Array<any>;
  public loadeditemList: Array<any>;
  public itemRef: firebase.database.Reference;
  loading: any;
  database: any;
  uid: any;

  constructor(public loadingCtrl: LoadingController, public authData: AuthData, public navCtrl: NavController, public navParams: NavParams,
    private af: AngularFireDatabase, private actionsheetctrl: ActionSheetController, private local:LocalStorage) {
    debugger
    this.uid = this.local.getData('uid');
    this.itemListRef$ = this.af.list('item');
    console.log("items", this.itemListRef$)
    // this.itemRef.on('value', itemList => {
    //   let items = [];
    //   console.log("itemList",itemList)
    //   itemList.forEach(item => {
    //     console.log("item",item.val())
    //   items.push(item.val());
    //     return false;
    //   });

    //   this.itemList = items;
    //   this.loadeditemList = items;
    // });


  }

  viewItem(items: Items) {
    debugger
    this.actionsheetctrl.create({
      title: `${items.itemName}`,
      buttons: [
        {
          text: 'View',
          handler: () => {
            console.log("here");
            // console.log(typeof items);
            this.navCtrl.push(ViewItemPage, { ItemsId: items.$key });
          }
        }

      ]
    }).present();
  }



  logOut() {
    this.local.removeData('email');
    this.local.removeData('uid');
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
