import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box-credit',
  templateUrl: './dialog-box-credit.component.html',
  styleUrls: ['./dialog-box-credit.component.scss'],
})
export class DialogBoxCreditComponent implements OnInit {
  creditAmount: string = "";  

 constructor(
  //  @Inject(MAT_DIALOG_DATA) public data:any
   )
    { }

  ngOnInit() {}

}
