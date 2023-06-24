import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {

  constructor() { }


  get(key:string ): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
