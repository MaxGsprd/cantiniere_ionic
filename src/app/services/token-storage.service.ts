import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  token_key = 'auth-token';
  user_key = 'auth-user';

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.token_key);
    window.sessionStorage.setItem(this.token_key, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(this.token_key);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(this.user_key);
    window.sessionStorage.setItem(this.user_key, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(this.user_key));
  }
}
