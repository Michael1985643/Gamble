import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire } from 'angularfire2';
import { Login } from '../login/login';
import { ItemToto } from '../itemToto/itemToto';
import { AddToto } from '../add-toto/add-toto';
import { ItemSpecial } from '../item-special/item-special';
import { AddSpecial } from '../add-special/add-special';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import moment from 'moment';
import { Totos } from '../../providers/totos';
import { Specials } from '../../providers/specials';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Totos, Specials]
})
export class HomePage {

  allItems= [];
  items = [];
  totos = [];
  specials = [];
  loading: any;
  gambleOpen: boolean = true;
  currentDate;
  gambleSelect: string = "mygambles";
  af;
  role: string;
  
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    af: AngularFire,
    private _auth: AuthService,
    public loadingCtrl: LoadingController,
    public Totos: Totos,
    public Specials: Specials) 
    {
      this.af = af;
      const getRole = af.database.object('/dnb/roles/' + _auth.auth$.getAuth().uid).subscribe(result => {
        this._auth.auth$.getAuth().auth["role"] = result.$value;
        this.role = result.$value
      })

      this.loading = this.loadingCtrl.create({
              content: "Please wait...",
      });
      this.loading.present();
      this.totos = Totos.getOpenTotos();
      this.specials = Specials.getOpenSpecials();
      this.currentDate = moment().format('x');
      this.loading.dismiss(); 
    }

  showMyOpenGambles () {
    this.totos = this.Totos.getOpenTotos();
    this.specials = this.Specials.getOpenSpecials();
  }

  showMyClosedGambles () {
    this.totos = this.Totos.getClosedTotos();
    this.specials = this.Specials.getClosedSpecials();
  }

 goToItem(item: any)
  {
    if (item.type=="toto") {
     this.navCtrl.push(ItemToto, {
       item: item
     });
    } 
    if (item.type=="special") {
     this.navCtrl.push(ItemSpecial, {
       item: item
     });
    } 
  }

  addSpecial (item: any) {
    this.navCtrl.push(AddSpecial, {
       item: item
     });
  }

  addToto (item: any) {
    this.navCtrl.push(AddToto, {
       item: item
     });
  }

  removeItem(item: any) {
    if (this.role === "admin") {
      let confirm = this.alertCtrl.create({
      title: 'Delete?',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.af.database.object('/dnb/gambles/' + item.type + 's/' + item.id).remove();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No');
          }
        }
      ]
    });
    confirm.present();
    }
  }

  logOut(af: AngularFire): void {
    this._auth.signOut()
      .then( success => {
          this.navCtrl.push(Login);
      })
  }

}
