import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

declare interface Routered {
  path: string;
  title: string;
}

export const ROUTES: Routered[] = [
  {path: '/accueil', title: 'Accueil'},
  {path: '/menus', title: 'Menus'},
  {path: '/login', title: 'Login'}

]

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentUser: any;
  isLogged :boolean = false;
  isLunchLady: Boolean;
  navItems: any[];

  constructor(private token_service: TokenStorageService) {}

  ngOnInit(): void {
    if(this.token_service.getUser()) {
      this.currentUser = this.token_service.getUser().user;
      this.isLunchLady = this.currentUser.isLunchLady;
      this.isLogged = true;
    }
    this.navItems = ROUTES.filter(navItem => navItem);
  }

  logout() {
    this.token_service.signOut();
    window.location.reload();
  }
}
