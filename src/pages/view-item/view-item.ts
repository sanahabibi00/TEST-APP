import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Items} from '../../model/Items/Items.interface';
import {Subscription} from 'rxjs/Subscription';
import{SearchPage} from '../search/search';

/**
 * Generated class for the ViewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-item',
  templateUrl: 'view-item.html',
})
export class ViewItemPage {

  itemSubscription: Subscription;
  itemRef$: FirebaseObjectObservable<Items>;
  item = {} as Items;
  itemName: string;
  itemStatus: string;
  itemImage: any;
  itemOwner: string;
constructor(public navCtrl: NavController, public navParams: NavParams,
private database: AngularFireDatabase
) {
   debugger
  const ItemsId = this.navParams.get('ItemsId');
  console.log(ItemsId);
this.itemRef$ = this.database.object(`item/${ItemsId}`);

this.itemSubscription = this.itemRef$.subscribe(
item => this.item = item);
console.log("viewItem",this.item)
this.itemName = this.item.itemName;
this.itemStatus = this.item.itemStatus;
this.itemImage = this.item.itemImage;
this.itemOwner = this.item.itemOwner;
}


  ionViewWillLeave() {
    this.itemSubscription.unsubscribe();
  }

}
