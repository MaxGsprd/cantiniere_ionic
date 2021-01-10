import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { WalletService } from 'src/app/services/wallet.service';
import { UserService } from 'src/app/services/user.service';
import { DialogBoxCreditComponent } from 'src/app/component/dialog-box-credit/dialog-box-credit.component';
import { DialogBoxDebitComponent } from 'src/app/component/dialog-box-debit/dialog-box-debit.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.page.html',
  styleUrls: ['./gestion-utilisateur.page.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GestionUtilisateurPage implements OnInit {
  users: User[] = [];
  usersTab: User[] = [];
  displayedColumns: string[] = ['name', 'firstname', 'wallet', 'id'];
  dataSource = new MatTableDataSource<User>(this.usersTab);
  userId: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private walletService: WalletService,
    private userService: UserService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  applyFilter(filterValue: string) {
    if(filterValue.length >= 3) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.data = this.usersTab;
      this.dataSource.filter = filterValue;
    }
  }

  async getUsers() {
    const response = await this.userService.getAllUser();
    this.usersTab = response;
    this.usersTab = this.sortUsersByName(this.usersTab);

  }

  sortUsersByName(users :User[])  {
    let sortedUsers = users.sort((a,b) => {
      if( a.name.toLowerCase() < b.name.toLowerCase()) {
        return - 1;
      }
      if( a.name.toLowerCase() > b.name.toLowerCase()) {
        return - 0;
     }
     return 0;
     })
     return sortedUsers;
  }

  creditUser(id: number) {
    //open dialog-box-credit
    let dialogRef = this.dialog.open(DialogBoxCreditComponent, {data: {userId: id}})
    //callback func. on dialog-box closing
    dialogRef.afterClosed().subscribe( creditAmount => {
      // credit amount check
      parseInt(creditAmount);
      if (isNaN(creditAmount) || creditAmount <= 0) {
        alert('veuillez entrer un montant valide');
      } else {
        // call walletService to credit the user and reload
        this.walletService.creditUser(id, creditAmount).subscribe( (res) => {
        this.creditAlert(`${res.name} ${res.firstname} a été crédité de : ${creditAmount}€`);
        })
      }
    })
  }

  //callback function to debit user on dialogbox interaction (function detail similar to  creditUser() )
  debitUser(id: number) {
    let dialogRef = this.dialog.open(DialogBoxDebitComponent, {data: {userId: id}})
    dialogRef.afterClosed().subscribe( debitAmount => {
      parseInt(debitAmount);
      if (isNaN(debitAmount) || debitAmount <= 0) {
        alert('veuillez entrer un montant valide');
      } else {
        this.walletService.debitUser(id, debitAmount).subscribe( (res) => {
        this.creditAlert(`${res.name} ${res.firstname} a été débité de : ${debitAmount}€`);
        })
      }
    })
  }

  voirProfil(id_user) {
    this.router.navigateByUrl('profil/'+id_user);
  }
  
  async creditAlert(message:string) {  
    const alert = await this.alertCtrl.create({  
      header: 'Utilisateur crédité',  
      subHeader: message,  
      buttons: ['J\'ai compris']  
    });  
    await alert.present();  
    await alert.onDidDismiss();  
    window.location.reload();
  }

  async debitAlert(message:string) {  
    const alert = await this.alertCtrl.create({  
      header: 'Utilisateur débité',  
      subHeader: message,  
      buttons: ['J\'ai compris']  
    });  
    await alert.present();  
    await alert.onDidDismiss();  
    window.location.reload();
  } 

}
