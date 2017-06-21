import { Injectable } from '@angular/core';

@Injectable()
export class SharedFunctions {

  constructor() {
    console.log('Hello SharedFunctions Provider');
  }

  public changeIonicDateTime(jsonDate, minusInt) {
      jsonDate.month = jsonDate.month - minusInt;
      return jsonDate
  }
}
