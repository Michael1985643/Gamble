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
          console.log(this.wedstrijden[0])
      })
  }

  addClicked() {
    const items = this.af.database.object('dnb/gambles/' + this.id);
    let item = {  
        id: this.id,
        name: this.name,
        closedForGamble: moment(this.closedForGamble).unix()*1000,
        startDate: moment(this.startDate).unix()*1000,
        endDate: moment(this.endDate).unix()*1000,
        linked: "wedstrijden",
        linkedId: this.linkedId,
        type: "toto"
    }
    items.set(item);
    this.navCtrl.push(HomePage);    
  }

}
