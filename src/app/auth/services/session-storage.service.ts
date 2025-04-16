import {Inject, Injectable} from '@angular/core';
import { WINDOW } from '../providers/window';

const TOKEN = 'SESSION_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string){
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
