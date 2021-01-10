import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-box-debit',
  templateUrl: './dialog-box-debit.component.html',
  styleUrls: ['./dialog-box-debit.component.scss'],
})
export class DialogBoxDebitComponent implements OnInit {

  debitAmount: string = "";  
  
  constructor() { }

  ngOnInit() {}

}
