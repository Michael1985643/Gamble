import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Login } from '../login/login';
import { Item } from '../item/item';
import { Subscription } from 'rxjs/Subscription';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any[]>;
  subscription: Subscription;
  loading: any;
  gambleOpen: boolean = true;
  herous: [any];

  constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService,public loadingCtrl: LoadingController) {
     this.loading = this.loadingCtrl.create({
            content: "Please wait...",
        });
     this.loading.present();
     this.items = af.database.list('/dnb/gambles')
     this.items.subscribe(items => {
        if (items) {
          this.loading.dismiss();
        }
     });
     
     this.herous = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
      //this.items.subscribe(items => {
    // items is an array
   // items.forEach(item => {
   //     console.log('Item:', item);
   // });
  //  this.items.subscribe((x) => alert('Reactive Firebase Working!'));
       //const promise = af.database.object('/gambles').remove();
    //promise
    //  .then(_ => console.log('success'))
     // .catch(err => console.log(err, 'You dont have access!'));
//});
  }

  isGambleOpen() {

  }

 goToItem()
  {
    this.navCtrl.setRoot(Item)
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
