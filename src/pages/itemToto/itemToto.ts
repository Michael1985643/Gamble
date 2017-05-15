import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the Item page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-itemToto',
  templateUrl: 'itemToto.html',
})
export class ItemToto {

  items: FirebaseListObservable<any[]>;
  loading: any;
  item;

  constructor(public navCtrl: NavController, public navParams: NavParams,af: AngularFire,private _auth: AuthService,public loadingCtrl: LoadingController) {
     this.item = this.navParams.get('item');
     console.log(this.item );
     this.items = af.database.list('/data/' + this.item.linked + '/' + this.item.linkedId)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Item');
  }

    doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
