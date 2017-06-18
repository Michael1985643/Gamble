import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

//import models
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  user: User;
  constructor(public af: AngularFire) {
  }

  public setUser (user: User) {
    this.user = user;
  }

  public getUser () {
    return this.user;
  }

  public isAdmin (): FirebaseObjectObservable<any> {
    return this.af.database.object('/dnb/roles/' + this.user.uid).map((value) => {
      this.user.role = value.$value
      if (value.$value == "admin") {
        value = true;
      } else {
        value = false;
      }
      return value
    }) as FirebaseObjectObservable<any[]>;
  }

}
