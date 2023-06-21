import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {

  constructor() { }

  set(key:string, data:any):void{
    try{
      localStorage.setItem(key,JSON.stringify(data));
    }catch (e){
      console.log('Error saving to localStorage',e)
    }
  }

  get(key:string ): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
