import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Items} from '../../model/Items/Items.interface';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  itemSubscription: Subscription;
    itemRef$: FirebaseObjectObservable<Items>;
    item = {} as Items;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase
  ) {
    debugger
    const ItemsId = this.navParams.get('ItemsId');
    console.log(ItemsId);
this.itemRef$ = this.database.object(`item/${ItemsId}`);

this.itemSubscription = this.itemRef$.subscribe(
  item => this.item = item);
}
editItems(item: Items){
  debugger
this.itemRef$.update(item);
this.navCtrl.pop();
}
  
ionViewWillLeave(){
  debugger
  this.itemSubscription.unsubscribe();
}

}
