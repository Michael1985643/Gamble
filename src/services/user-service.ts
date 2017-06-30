import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import moment from 'moment';

//import models
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  user: User;

  constructor(public af: AngularFire) {
  }

  public setUser (user: any) {
    let myUser = new User;
    myUser.uid = user.uid;
    myUser.displayName = user.auth.displayName
    myUser.email = user.auth.email;
    myUser.photoURL = user.auth.photoURL;
    myUser.lastLoginDate =  moment().unix()*1000
    
    let addItem = this.af.database.object('/users/' + user.uid);
    return addItem.update(myUser);
  }

  public getUser(uid): FirebaseObjectObservable<any> {
    return this.af.database.object('/users/' + uid).map((userObject) => {  
        if (!userObject["nickName"]) {
          userObject["nickName"] = userObject["displayName"];
        }
        userObject["role"] =  userObject["role"];
        userObject["subscription"] =  userObject["subscription"];
        return userObject;
    }) as FirebaseObjectObservable<any[]>;
  }

  public getAllPlayers(subscription) {
    return this.af.database.list(subscription + '/players/playerInfo').map((players) => {  
        return players;
    }) as FirebaseObjectObservable<any[]>;
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

  public getSubscription (uid): FirebaseObjectObservable<any> {
    return this.af.database.object('/usersSecure/' + uid).map((value) => {
      return value.subscription;
    }) as FirebaseObjectObservable<any[]>;
  }
}


