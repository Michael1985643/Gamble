import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import moment from 'moment';


/**
 * Generated class for the AddToto page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-toto',
  templateUrl: 'add-toto.html',
})
export class AddToto {
  selectOptions
  wedstrijden = [];
  af;
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
    af: AngularFire,
    private _auth: AuthService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {
     this.af = af;
     this.loading = this.loadingCtrl.create({
            content: "Please wait...",
     });
     this.loading.present();
      af.database.list('/data/wedstrijden').forEach(itemArrayWedstrijden => {
          this.wedstrijden.length = 0;
          itemArrayWedstrijden.forEach(element => {
            this.wedstrijden.push(element)
          });
          this.loading.dismiss();
      })
  }

  addClicked() {
    //this date conversion is needed because the icon date picker month start with 1 while moments starts with 0
    this.closedForGamble = (typeof this.closedForGamble) == "object" ? moment(this.changeIonicDateTime(this.closedForGamble, 1)).unix()*1000  : moment(this.closedForGamble).unix()*1000;
    this.startDate = (typeof this.startDate) == "object" ? moment(this.changeIonicDateTime(this.closedForGamble, 1)).unix()*1000 : moment(this.startDate).unix()*1000;
    this.endDate = (typeof this.endDate) == "object" ? moment(this.changeIonicDateTime(this.closedForGamble, 1)).unix()*1000 : moment(this.endDate).unix()*1000;

    const items = this.af.database.object('dnb/gambles/totos/' + this.id);
    let item = {  
        id: this.id,
        name: this.name,
        closedForGamble: this.closedForGamble,
        startDate: this.startDate,
        endDate:this.endDate,
        linked: "wedstrijden",
        linkedId: this.linkedId,
        type: "toto",
        pot: parseInt(this.pot)
    }
    items.set(item);
    this.navCtrl.push(HomePage);    
  }
  
  someEvent() {
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

  changeIonicDateTime(jsonDate, minusInt) {
      jsonDate.month = jsonDate.month - minusInt;
      return jsonDate
  }
}
