import { SharedFunctions } from '../../../shared/shared-functions';
import { SpecialService } from '../../../services/special-service';
import { Special } from './../../../models/special.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import moment from 'moment';
import { WedstrijdService } from '../../../services/wedstrijd-service';


@IonicPage()
@Component({
  selector: 'page-add-special',
  templateUrl: 'add-special.html'
})
export class AddSpecial {
  loading: any;
  id: string;
  name: string;
  specialDate;
  closedForGamble;
  home: string;
  away: string;
  speelrondes: any;
  speelrondewedstrijden: any;
  speelronde: string;
  wedstrijdselected: string;
  homeImage: string;
  awayImage: string;
  pot;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFire,
    private _auth: AuthService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public wedstrijdService: WedstrijdService,
    public specialService: SpecialService,
    public sharedFunctions: SharedFunctions) 
    {
      this.loading = this.loadingCtrl.create({
            content: "Please wait...",
      });
      this.loading.present();
      this.wedstrijdService.getAll().subscribe(results => {
        this.speelrondes = results;
        this.loading.dismiss();
      })
    }

  speelrondeSelected() {
    this.speelrondewedstrijden = this.speelrondes[parseInt(this.speelronde)]
  }

  wedstrijdSelected() {
    this.home = this.speelrondewedstrijden[parseInt(this.wedstrijdselected)].homeTeamName;
    this.away = this.speelrondewedstrijden[parseInt(this.wedstrijdselected)].awayTeamName;
    this.specialDate = moment(this.speelrondewedstrijden[parseInt(this.wedstrijdselected)].date).format();
    this.closedForGamble = moment(this.speelrondewedstrijden[parseInt(this.wedstrijdselected)].date).format();
    this.homeImage = this.speelrondewedstrijden[parseInt(this.wedstrijdselected)].homeTeamNameCrestUrl;
    this.awayImage = this.speelrondewedstrijden[parseInt(this.wedstrijdselected)].awayTeamNameCrestUrl;
  }

  addClicked() {
    //this date conversion is needed because the icon date picker month start with 1 while moments starts with 0
    this.closedForGamble = (typeof this.closedForGamble) == "object" ? moment(this.sharedFunctions.changeIonicDateTime(this.closedForGamble, 1)).unix()*1000  : moment(this.closedForGamble).unix()*1000;
    this.specialDate = (typeof this.specialDate) == "object" ? moment(this.sharedFunctions.changeIonicDateTime(this.specialDate, 1)).unix()*1000 : moment(this.specialDate).unix()*1000;
    let linked = this.wedstrijdselected == undefined ? "" : this.wedstrijdselected;
    let linkedId = this.speelronde == undefined ? "" : this.speelronde;
    let linkedWedstrijdId = this.wedstrijdselected == undefined ? "" : this.wedstrijdselected;

    var special = new Special(
        parseInt(this.id),
        this.name,
        this.home,
        this.away,
        this.specialDate,
        this.homeImage,
        this.awayImage,       
        this.closedForGamble,
        linked,
        linkedId,
        linkedWedstrijdId,
        parseInt(this.pot)
    )
    this.specialService.add(special)
    this.navCtrl.push(HomePage);      
  }
}
