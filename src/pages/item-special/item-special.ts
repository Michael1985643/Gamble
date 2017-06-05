import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { AlertController } from 'ionic-angular';

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
  homeGoals: any;
  awayGoals: any;
  choosenSpecials: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    af: AngularFire,
    private _auth: AuthService,
    public alertCtrl: AlertController) {
     this.af = af;
     this.user = _auth.auth$.getAuth().auth;
     this.item = this.navParams.get('item'); 
        
     this.af.database.list('/dnb/players/specials/' +  this.item.id).subscribe(result => {
        this.choosenSpecials = result;
     });       
     this.getSpecial();
  }

  getSpecial() {
    const firebaseObservable = this.af.database.object('/dnb/players/specials/' +  this.item.id + '/' + this.user.uid).forEach(itemArray => {
      this.homeGoals = itemArray.homeGoals;
      this.awayGoals = itemArray.awayGoals;
    })
  }

  setSpecial() {
    if (!this.isValid()) { return; };
    const path = this.af.database.object('/dnb/players/specials/' +  this.item.id + '/' + this.user.uid);
    let newItem = {  
        homeGoals: parseInt(this.homeGoals) >= 0 ? parseInt(this.homeGoals) : "",
        awayGoals: parseInt(this.awayGoals) >= 0 ? parseInt(this.awayGoals) : ""
    }
    path.set(newItem); 
  }

  isValid() {
    if (this.homeGoals >= 0 && this.awayGoals >= 0) {
      var valid = true;
      this.choosenSpecials.forEach(specialUser => {
        if (specialUser.homeGoals == this.homeGoals && specialUser.awayGoals == this.awayGoals && specialUser.$key != this.user.uid ) {
          valid = false;
          return valid;
        }
      });
      if (!valid) {
        this.showSpecials();
      }
      else {
        return valid;
      }
    } 
    else {
      return false;
    }
  }

  showSpecials() {
    var alertText= "<ul>";
    this.choosenSpecials.forEach(specialUser => {
      if (specialUser.$key != this.user.uid) {
        alertText += "<li>" + specialUser.homeGoals + " - " + specialUser.awayGoals + "</li>";
      }
    })
    alertText += "</ul>";

    let alert = this.alertCtrl.create({
      title: 'Gekozen specials',
      subTitle: alertText,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.homeGoals = "";
            this.awayGoals = "";
          }
        }
      ]
    });
    alert.present();
  }  

}
