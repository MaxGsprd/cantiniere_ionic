import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CartPage } from './layout/cart/cart.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [CartPage]
})
export class AppComponent {
  currentUser: any;
  isLogged :boolean = false;
  isLunchLady: Boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private token_service: TokenStorageService,
    public cart: CartPage
  ) {
    this.initializeApp();
    if(this.token_service.getUser()) {
      this.currentUser = this.token_service.getUser().user;
      this.isLunchLady = this.currentUser.isLunchLady;
      this.isLogged = true;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  logout() {
    this.token_service.signOut();
    window.location.reload();
  }

}
