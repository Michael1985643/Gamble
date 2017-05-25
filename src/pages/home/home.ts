import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Login } from '../login/login';
import { ItemToto } from '../itemToto/itemToto';
import { LoadingController } from 'ionic-angular';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allItems: any[];
  items = [];
  loading: any;
  gambleOpen: boolean = true;
  currentDate;
  pet: string = "open";

  constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService,public loadingCtrl: LoadingController) {
     this.loading = this.loadingCtrl.create({
            content: "Please wait...",
        });
     this.loading.present();
      af.database.list('/dnb/gambles').subscribe(result => {
        this.allItems = result;
        result.forEach(element => {
          if (moment() < moment(element.closedForGamble)) {
            console.log(element)
            this.items.push(element);
          }
        });
        if (result) {
          this.loading.dismiss();
        }
     });
    this.currentDate = moment().format('x');

  }

  showOpenItems () {
    this.items.length = 0;
    this.allItems.forEach(element => {
      if (moment() < moment(element.closedForGamble)) {
        this.items.push(element);  
      }
    });
  }

  showClosedItems () {
    this.items.length = 0;
    this.allItems.forEach(element => {
      if (moment() > moment(element.closedForGamble)) {
        this.items.push(element);  
      }
    });   
  }

 goToItemToto(item: any)
  {
     this.navCtrl.push(ItemToto, {
       item: item
     });

  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  logOut(af: AngularFire): void {
    this._auth.signOut()
      .then( success => {
          this.navCtrl.push(Login);
      })
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ",this._auth.displayName());
  }

}
