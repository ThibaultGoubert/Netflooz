import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  log(msg: any): void {
    console.log(new Date() +": " + JSON.stringify(msg));
  }
}
