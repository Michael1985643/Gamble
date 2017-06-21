
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { AlertController } from 'ionic-angular';
import moment from 'moment';

//services
import { SpecialService } from '../../../services/special-service';

@IonicPage()
@Component({
  selector: 'page-item-special',
  templateUrl: 'item-special.html',
})
export class ItemSpecial {
  user;
  item;
  homeGoals: any;
  awayGoals: any;
  choosenSpecials: any;
  closedForGamble: any;
  currentDate = moment().format('x');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFire,
    private _auth: AuthService,
    public alertCtrl: AlertController,
    public specialService: SpecialService
    ) {
     this.user = _auth.auth$.getAuth().auth;
     this.item = this.navParams.get('item'); 
        
     this.choosenSpecials = this.specialService.getAllPlayerSpecials(this.item.id)
     this.getSpecial();
  }

  getSpecial() {
    this.specialService.getPlayerSpecial(this.item.id, this.user.uid).subscribe (result => {
      this.homeGoals = result["homeGoals"];
      this.awayGoals = result["awayGoals"];
    })
  }

  setSpecial() {
    if (!this.isValid()) { return; };
    this.specialService.setPlayerSpecial(this.item.id, this.user.uid, this.homeGoals, this.awayGoals)
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
