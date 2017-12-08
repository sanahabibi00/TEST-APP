import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import {AddItemsPage} from '../add-items/add-items';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Items} from '../../model/Items/Items.interface';
import {EditItemPage} from '../edit-item/edit-item';
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  itemListRef$: FirebaseListObservable<Items[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private actionsheetctrl: ActionSheetController) {
 this.itemListRef$ = this.database.list('item');
  
  }
  selectItem( items: Items){
    this.actionsheetctrl.create({
      title:`${items.itemName}`,
      buttons:[
        {
          text: 'Edit',
          handler:() => {
            console.log("here");
            // console.log(typeof items);
           this.navCtrl.push(EditItemPage, {ItemsId: items.$key });
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
}
