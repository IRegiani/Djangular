import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdSelectorService {
  public sharedId: number;

  constructor(){
    this.sharedId = 0;
  }

  setData (data) {
    this.sharedId = data;
  }
  getData () {
    return this.sharedId;
  }
}
