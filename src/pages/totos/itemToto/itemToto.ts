import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
import moment from 'moment';
import { AlertController } from 'ionic-angular';

//Pages
import { TotoOverview } from '../toto-overview/toto-overview';

//services
import { TotoService } from '../../../services/toto-service';
import { WedstrijdService } from '../../../services/wedstrijd-service';

@Component({
  selector: 'page-itemToto',
  templateUrl: 'itemToto.html'
})
export class ItemToto {
  items= [];
  loading: any;
  item;
  user;
  currentDate = moment().format('x');
  closedForGamble;

  constructor(
    public alertCtrl: AlertController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFire,
    private _auth: AuthService,
    public loadingCtrl: LoadingController,
    public totoService: TotoService,
    public wedstrijdService: WedstrijdService) 
    {
      this.user = _auth.auth$.getAuth().auth;
      this.item = this.navParams.get('item');
      this.closedForGamble = this.item.closedForGamble;
      this.getWedstrijdenAndRelateToPlayerGamble();

    }

  private getWedstrijdenAndRelateToPlayerGamble () {
    this.wedstrijdService.getWedstrijden(this.item.linked, this.item.linkedId).subscribe((wedstrijden ) => {
      this.totoService.getPlayerGamble(this.item.id, this.user.uid).subscribe((playerGamble ) => {
          wedstrijden.forEach(wedstrijdObject => {
            playerGamble.forEach(playerObject => {
                if (playerObject.$key == wedstrijdObject.id) {
                  wedstrijdObject.selectedItem = playerObject.$value;
                }
            })
        });
        this.items = wedstrijden;
      })
    })
  }

  private isComplete(item) {
    if (parseInt(item.goalsHomeTeam) >= 0 && parseInt(item.goalsAwayTeam) >= 0) {
      return true
    }
    else { 
      return false 
    }
  }

  private itemClicked(item, teamName, event) {
    if (moment() > moment(this.item.closedForGamble)) {
      this.showAlertIsClosed();
      return
    }

    if (teamName == item.selectedItem) {
      item.selectedItem = "";
      this.totoService.removePlayerToto(this.item.id ,this.user.uid, item.id);
    }
    else 
    {
      item.selectedItem = teamName;
      this.totoService.setPlayerToto(this.item.id ,this.user.uid, item.id, teamName);
        //items.set(firebase.database.ServerValue.TIMESTAMP);
        //timestamp = https://www.epochconverter.com/ UTC
    }
  }

  private showAlertIsClosed() {
    let alert = this.alertCtrl.create({
      title: 'Gamble closed',
      subTitle: this.item.name + ' was closed on ' + moment(this.item.closedForGamble).format('dddd DD-MM-YYYY HH:mm:ss'),
      buttons: ['OK']
    });
    alert.present();
  }

  private overview()  {
    this.navCtrl.push(TotoOverview);
  }
}
