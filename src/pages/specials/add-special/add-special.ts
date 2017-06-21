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
import { Wedstrijden } from '../../../providers/wedstrijden';

/**
 * Generated class for the AddSpecial page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-special',
  templateUrl: 'add-special.html',
  providers: [Wedstrijden]
})
export class AddSpecial {
  af: any;
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
    af: AngularFire,
    private _auth: AuthService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public wedstrijden: Wedstrijden,
    public specialService: SpecialService,
    public sharedFunctions: SharedFunctions) 
    {
      this.af = af;
      this.loading = this.loadingCtrl.create({
          content: "Please wait...",
      });
      this.loading.present();
      this.wedstrijden.getWedstrijden()
        .then(speelrondes => {
          this.speelrondes = speelrondes;
          this.loading.dismiss();  
        }
      );
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
    this.closedForGamble = (typeof this.closedForGamble) == "object" ? moment(this.changeIonicDateTime(this.closedForGamble, 1)).unix()*1000  : moment(this.closedForGamble).unix()*1000;
    this.specialDate = (typeof this.specialDate) == "object" ? moment(this.changeIonicDateTime(this.specialDate, 1)).unix()*1000 : moment(this.specialDate).unix()*1000;
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

    // const items = this.af.database.object('dnb/gambles/specials/' + this.id);
    // let item = {  
    //     id: this.id,
    //     name: this.name,
    //     closedForGamble: this.closedForGamble,
    //     date: this.specialDate,
    //     home: this.home,
    //     away: this.away,
    //     type: "special",
    //     linked: this.wedstrijdselected == undefined ? "" : this.wedstrijdselected,
    //     linkedId: this.speelronde == undefined ? "" : this.speelronde,
    //     linkedWedstrijdId: this.wedstrijdselected == undefined ? "" : this.wedstrijdselected,
    //     homeImage: this.homeImage,
    //     awayImage: this.awayImage,
    //     pot: parseInt(this.pot)

    // }
    // items.set(item);
    // this.navCtrl.push(HomePage);    
  }

  changeIonicDateTime(jsonDate, minusInt) {
      jsonDate.month = jsonDate.month - minusInt;
      return jsonDate
  }
}
