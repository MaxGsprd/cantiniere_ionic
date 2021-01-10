import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-snackbar',
  templateUrl: './login-snackbar.component.html',
  styleUrls: ['./login-snackbar.component.scss'],
})
export class LoginSnackbarComponent implements OnInit {

  constructor(private snackBarRef: MatSnackBarRef<LoginSnackbarComponent>) { }

  close(){
    this.snackBarRef.dismiss();
  }

  ngOnInit() {}

}
