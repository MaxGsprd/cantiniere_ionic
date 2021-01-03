import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userProfile: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private fb:FormBuilder, private router : Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      if (this.isLoggedIn) {
        this.router.navigate(['/home']);
      }
    }
    this.editForm();
  }
  
  editForm(){
    this.userProfile = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })
  }

  onSubmit(): void {
    console.log(this.userProfile.value);
    const form = this.userProfile.value;
    this.authService.login(JSON.stringify(form))
    .then( res => {
        console.log(res);
        let token = res.headers.get('Authorization').split('Bearer').pop()
        let user = jwt_decode(token);
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUser(user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.reload();
    },
    ).catch(err => {
      console.log('err : ', err);
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
    )
  }

  reloadPage(): void {
    window.location.reload();
  }



}
