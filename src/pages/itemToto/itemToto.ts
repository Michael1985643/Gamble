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

  items = [];
  loading: any;
  item;
  selectedItem;
  user;
  af;
  value;

  constructor(public navCtrl: NavController, public navParams: NavParams,af: AngularFire,private _auth: AuthService,public loadingCtrl: LoadingController) {
     this.af = af;
     this.user = _auth.auth$.getAuth().auth;
     this.item = this.navParams.get('item');

     /*
     this.items = af.database.list('/data/' + this.item.linked + '/' + this.item.linkedId)

       this.items.forEach(itemArray => {
        for(var i = 0; i < itemArray.length; i++){
          const wobj = itemArray[i];
          const uid = this.user.uid;
          const wid = parseInt(itemArray[i].id);
          var playerRes = this.item.players[uid];
          wobj.selectedItem = playerRes[wid];
            
          console.log(playerRes[wid]);
        }
      });    
      */

      af.database.list('/data/' + this.item.linked + '/' + this.item.linkedId).forEach(itemArray => {
        for(var i = 0; i < itemArray.length; i++){
          const wobj = itemArray[i];
          const uid = this.user.uid;
          const wid = parseInt(itemArray[i].id);
          if (this.item.players)
          {
            if (this.item.players[uid]) {
              var playerRes = this.item.players[uid];
              wobj.selectedItem = playerRes[wid];
              this.items.push(wobj);
              console.log(playerRes[wid]);
            }
          }
          else {
            this.items.push(wobj);
          }
        }
      });   

  }

  itemClicked(item, teamName, event) {
    if (teamName == item.selectedItem) {
        item.selectedItem = "";
        const value = this.af.database.object('dnb/players/' + this.user.uid + '/' + this.item.$key + '/' + item.id);
        value.remove()
    }
    else 
    {
        item.selectedItem = teamName;
        const items = this.af.database.object('dnb/players/' + this.user.uid + '/' + this.item.$key + '/' + item.id);
        items.set(teamName);
    }
  }
}
