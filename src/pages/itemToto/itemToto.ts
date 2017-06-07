import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the Item page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-itemToto',
  templateUrl: 'itemToto.html'
})
export class ItemToto {

  items = [];
  loading: any;
  item;
  selectedItem;
  user;
  af;
  value;

  constructor(
    public alertCtrl: AlertController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    af: AngularFire,
    private _auth: AuthService,
    public loadingCtrl: LoadingController) 
    {
     this.af = af;
     this.user = _auth.auth$.getAuth().auth;
     this.item = this.navParams.get('item');
      af.database.list('/data/' + this.item.linked + '/' + this.item.linkedId).forEach(itemArray => {
          for(var i = 0; i < itemArray.length; i++){
            const wobj = itemArray[i];
            const wid = parseInt(itemArray[i].id);
    
            af.database.object('/dnb/players/totos/' + this.item.id + '/' + this.user.uid + '/' + wid).forEach(playerItem => {  
              if (playerItem.$exists() === true) {
                wobj.selectedItem = playerItem.$value;
              }
            })
            this.items.push(wobj);
          }
      });   
  }

  isComplete(item) {
    if (parseInt(item.goalsHomeTeam) >= 0 && parseInt(item.goalsAwayTeam) >= 0) {
      return true
    }
      else { return false }
  }

  itemClicked(item, teamName, event) {
   if (moment() < moment(this.item.closedForGamble)) {
    if (teamName == item.selectedItem) {
        item.selectedItem = "";
        const value = this.af.database.object('/dnb/players/totos/' + this.item.id + '/' + this.user.uid + '/' + item.id);
        value.remove()
    }
    else 
    {
        item.selectedItem = teamName;
        const items = this.af.database.object('/dnb/players/totos/' + this.item.id + '/' + this.user.uid + '/' + item.id);
        items.set(teamName);
        //items.set(firebase.database.ServerValue.TIMESTAMP);
        //timestamp = https://www.epochconverter.com/ UTC
    }
   }
   else {
    let alert = this.alertCtrl.create({
      title: 'Gamble closed',
      subTitle: this.item.name + ' was closed on ' + moment(this.item.closedForGamble).format('dddd DD-MM-YYYY HH:mm:ss'),
      buttons: ['OK']
    });
    alert.present();
   }
  }
}
