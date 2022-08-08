import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddItemsPage } from '../add-items/add-items';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Items } from '../../model/Items/Items.interface';
import { EditItemPage } from '../edit-item/edit-item';

import { LocalStorage } from '../../service/localStorage.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  itemListRef$: FirebaseListObservable<Items[]>
  public itemRef: firebase.database.Reference;
  uid: string;
  List: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase, private actionsheetctrl: ActionSheetController,
    private local: LocalStorage) {



  }

  ngOnInit() {
    this.uid = this.local.getData('uid')
    this.getTemsByUid(this.uid);
  }
  selectItem(items: Items) {
    debugger
    this.actionsheetctrl.create({
      title: `${items.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log("here");
            // console.log(typeof items);
            this.navCtrl.push(EditItemPage, { ItemsId: items.$key });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.itemListRef$.remove(items.$key);

          }
        }

      ]
    }).present();
  }

  navigateToAdditemsPage() {
    this.navCtrl.push(AddItemsPage);
  }
  async getTemsByUid(uid: string) {
    this.itemListRef$ = this.database.list(`item`)
    this.itemListRef$.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
          console.log(snapshot);
          this.List.push(snapshot);
          console.log("Array Length = ",this.List.length); // See the length of the array growing ;)
      });})
    console.log("itemssmy", this.itemListRef$)



    console.log("List", this.List)

    this.List = this.List.filter(item =>{
     return  item.uid == uid
    })

  }



}


