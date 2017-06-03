import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire } from 'angularfire2';

/**
 * Generated class for the ItemSpecial page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-item-special',
  templateUrl: 'item-special.html',
})
export class ItemSpecial {
  af;
  user;
  item;
  homeGoals: number;
  awayGoals: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    af: AngularFire,
    private _auth: AuthService) {
     this.af = af;
     this.user = _auth.auth$.getAuth().auth;
     this.item = this.navParams.get('item');
  }

  setSpecial() {
    const path = this.af.database.object('/dnb/players/' + this.user.uid + '/' + this.item.id);
    let newItem = {  
        id: this.item.id,
        homeGoals: 4,
        awayGoals: this.awayGoals
    }

    path.set(newItem); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemSpecial');
  }

}
