import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wallet-snackbar',
  templateUrl: './wallet-snackbar.component.html',
  styleUrls: ['./wallet-snackbar.component.scss'],
})
export class WalletSnackbarComponent implements OnInit {

  constructor(private snackBarRef: MatSnackBarRef<WalletSnackbarComponent>) { }

  close(){
    this.snackBarRef.dismiss();
  }

  ngOnInit() {}

}
