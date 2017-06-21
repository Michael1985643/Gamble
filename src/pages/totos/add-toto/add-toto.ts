import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import moment from 'moment';

//services
import { WedstrijdService } from '../../../services/wedstrijd-service';
import { TotoService } from '../../../services/toto-service';
import { SharedFunctions } from '../../../shared/shared-functions';

//models
import { Toto } from '../../../models/toto.model';

@IonicPage()
@Component({
  selector: 'page-add-toto',
  templateUrl: 'add-toto.html',
})
export class AddToto {
  selectOptions
  wedstrijden = [];
  loading: any;
  id: string;
  name: string;
  startDate;
  endDate;
  closedForGamble;
  linkedId;
  item;
  pot;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFire,
    private _auth: AuthService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public wedstrijdService: WedstrijdService,
    public totoService: TotoService,
    public sharedFunctions: SharedFunctions
    ) {
      this.loading = this.loadingCtrl.create({
            content: "Please wait...",
      });
      this.loading.present();
      this.wedstrijdService.getAll().subscribe(results => {
        this.wedstrijden = results;
        this.loading.dismiss();
      })
  }

  addClicked() {
    //this date conversion is needed because the icon date picker month start with 1 while moments starts with 0
    this.closedForGamble = (typeof this.closedForGamble) == "object" ? moment(this.sharedFunctions.changeIonicDateTime(this.closedForGamble, 1)).unix()*1000  : moment(this.closedForGamble).unix()*1000;
    this.startDate = (typeof this.startDate) == "object" ? moment(this.sharedFunctions.changeIonicDateTime(this.closedForGamble, 1)).unix()*1000 : moment(this.startDate).unix()*1000;
    this.endDate = (typeof this.endDate) == "object" ? moment(this.sharedFunctions.changeIonicDateTime(this.closedForGamble, 1)).unix()*1000 : moment(this.endDate).unix()*1000;

    var toto = new Toto(
      parseInt(this.id),
      this.name,
      this.startDate,
      this.endDate,
      this.closedForGamble,
      "wedstrijden",
      this.linkedId,
      parseInt(this.pot)
    )
    this.totoService.add(toto)
    this.navCtrl.push(HomePage);    
  }
  
  linkedIdChanged() {
    moment.fn.toJSON = function() { return this.format(); }
    let arrayOfSelectedWedstrijden = this.wedstrijden[this.linkedId - 1];
    arrayOfSelectedWedstrijden.sort(function(a,b) { 
      return moment(a.date).date() - moment(a.date).date();
    });

    this.id = this.linkedId;
    this.closedForGamble = moment(arrayOfSelectedWedstrijden[0].date).toJSON();
    this.startDate = moment(arrayOfSelectedWedstrijden[0].date).toJSON();
    this.endDate = moment(arrayOfSelectedWedstrijden[arrayOfSelectedWedstrijden.length - 1].date).toJSON();
  }
}
