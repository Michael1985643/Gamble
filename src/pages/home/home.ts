import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Login } from '../login/login';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any[]>;
  subscription: Subscription;

  constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {
      this.items = af.database.list('/gambles')
      this.items.subscribe(items => {
    // items is an array
    items.forEach(item => {
        console.log('Item:', item);
    });
});
  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  logOut(af: AngularFire): void {
    this.subscription.unsubscribe()
    this._auth.signOut()
      .then( success => {
          this.navCtrl.push(Login);
      })
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ",this._auth.displayName());
  }

}
