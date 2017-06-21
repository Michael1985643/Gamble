import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import moment from 'moment';
import 'rxjs/add/operator/map';

//models
import { GambleBaseModel } from '../models/gamble.base.model';

@Injectable()
export class GambleBaseService {
  items: FirebaseListObservable<any[]>;
  subscription: string;
  location: string;

  constructor(public af: AngularFire, public _auth: AuthService) {
  }

  public getAll(): FirebaseListObservable<any[]> {
    return this.af.database.list(this._auth.userService.user["subscription"] + this.location);
  }

  public getOpen(): FirebaseListObservable<any[]> {
    return this.af.database.list(this._auth.userService.user["subscription"] + this.location).map(result => {
      var arrTotosOpen = [];
       for (var index = 0; index < result.length; index++) {
         if (this.isOpen(result[index]) === true) {
            arrTotosOpen.push(result[index]);
         }
       }
       return arrTotosOpen;
    }) as FirebaseListObservable<any[]>;
  }

  public getClosed(): FirebaseListObservable<any[]> {
    return this.af.database.list(this._auth.userService.user["subscription"] + this.location).map(result => {
      var arrTotosClosed = [];
       for (var index = 0; index < result.length; index++) {
         if (this.isOpen(result[index]) === false) {
            arrTotosClosed.push(result[index]);
         }
       }
       return arrTotosClosed;
    }) as FirebaseListObservable<any[]>;
  }

  public remove(id) {
    this.af.database.object(this._auth.userService.user["subscription"] + this.location + '/' + id).remove();
  }

  private isOpen(gamble: GambleBaseModel): boolean {
    if (moment() < moment(gamble.closedForGamble))  {
      return true   
    }
    else {
      return false;
    }
  }

}
