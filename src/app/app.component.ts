import { Component } from '@angular/core';
import {UserStoreService} from "@app/user/services/user-store.service";
import {AuthService} from "@app/auth/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(protected service: UserStoreService,
              private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
