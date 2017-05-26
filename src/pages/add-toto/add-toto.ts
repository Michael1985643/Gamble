import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ItemToto } from '../itemToto/itemToto';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    af: AngularFire,
    private _auth: AuthService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddToto');
  }

  presentModal() {
    let modal = this.modalCtrl.create(ItemToto);
    modal.present();
  }

}
