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
import { Commande } from 'src/app/models/Commande';
import { OrderService } from 'src/app/services/order.service';
import { ConfirmDialogComponent } from 'src/app/component/confirm-dialog/confirm-dialog.component';

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

  commandes_passees: Commande[] = [];
  displayedColumns2: string[] = ['id', 'idUser', 'firstName', 'name', 'creationDate', 'creationTime', 'status', 'action'];
  dataSource2 = new MatTableDataSource<Commande>(this.commandes_passees);
  expandedElement: User | null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private walletService: WalletService,
    private userService: UserService,
    private order_service: OrderService,
    public alertCtrl: AlertController,
    private route: ActivatedRoute
  ) { 
    this.userId = this.route.snapshot.paramMap.get('id');
    this.dataSource2.filterPredicate = function(data, filter:string):boolean {
      var str1 = data.user.firstname.toLowerCase();
      var str2 = data.user.name.toLowerCase();
      var str3 = str1.concat(" ", str2);
      var str4 = str2.concat(" ", str1);
      return str1.includes(filter) || str2.includes(filter) || str3.includes(filter) || str4.includes(filter);
    }

    this.dataSource.filterPredicate = function(data, filter:string):boolean {
      var str1 = data.firstname.toLowerCase();
      var str2 = data.name.toLowerCase();
      var str3 = str1.concat(" ", str2);
      var str4 = str2.concat(" ", str1);
      return str1.includes(filter) || str2.includes(filter) || str3.includes(filter) || str4.includes(filter);
    }
  }

  ngOnInit() {
    this.getUsers();
    this.getOrders();
  }

  applyFilter(filterValue: string) {
    if(filterValue.length >= 3) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.data = this.usersTab;
      this.dataSource2.data = this.commandes_passees;
      this.dataSource2.filter = filterValue;
      this.dataSource.filter = filterValue;
    }
    else {
      this.dataSource.filter = '';
    }
  }

  async getUsers() {
    const response = await this.userService.getAllUser();
    this.usersTab = response;
    this.usersTab = this.sortUsersByName(this.usersTab);

  }

  getOrders(){
    this.order_service.findAll().subscribe((data) => {
      this.commandes_passees = data;
      this.dataSource2.data = this.commandes_passees;
    });
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
        this.debitAlert(`${res.name} ${res.firstname} a été débité de : ${debitAmount}€`);
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

  cancelOrder(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Annulation de la commande',
        message: "Confirmer l'annulation de la commande n°" + id + ' ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirm') {
        this.order_service
          .cancel(id)
          .subscribe(() => window.location.reload());
          // console.log("Commande n°" + id + " annulée !");
      }
    });
  }

  payOrder(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation de la commande',
        message: "Confirmer et payer la commande n°" + id + ' ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'confirm') {
        this.order_service
          .pay(id)
          .subscribe(() => window.location.reload());
          // console.log("Commande n°" + id + " validée et payée !");
      }
    });
  }

}
