import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { Commande } from '../../models/Commande';
import { User } from '../../models/User';
import { ConfirmDialogComponent } from '../../component/confirm-dialog/confirm-dialog.component';
import { WalletService } from '../../services/wallet.service';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxCreditComponent } from 'src/app/component/dialog-box-credit/dialog-box-credit.component';
import { DialogBoxDebitComponent } from 'src/app/component/dialog-box-debit/dialog-box-debit.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CantiniereService } from '../../services/cantiniere.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  commandes_passees: Commande[] = [];
  commandes: Commande[] = [];
  users: User[] = [];
  userId: any;
  displayedColumns2: string[] = ['id', 'idUser', 'firstName', 'name', 'creationDate', 'creationTime', 'status', 'action'];
  dataSource2 = new MatTableDataSource<Commande>(this.commandes_passees);

  //Variable Max

  usersTab: User[] = [];
  displayedColumns: string[] = ['name', 'firstname', 'wallet', 'id'];
  dataSource = new MatTableDataSource<User>(this.usersTab);

  //Variable Rélesse

  menus = [];
  panelOpenState = false;

  constructor(
    private cantiniere_api: OrderService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private walletService: WalletService,
    private userService: UserService,
    private cantiniere_service : CantiniereService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.cantiniere_api.findAll().subscribe((data) => {
      this.commandes_passees = data;
      this.dataSource2.data = this.commandes_passees;
      console.log(this.commandes_passees);
    });
    this.cantiniere_api.findAllbyUser(this.userId).subscribe((data) => {
      this.commandes = data;
      console.log(this.commandes);
    });

    this.dataSource2.filterPredicate = function(data, filter:string):boolean {
      var str1 = data.user.firstname.toLowerCase();
      var str2 = data.user.name.toLowerCase();
      var str3 = str1.concat(" ", str2);
      var str4 = str2.concat(" ", str1);
      return str1.includes(filter) || str2.includes(filter) || str3.includes(filter) || str4.includes(filter);
    }
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
        this.cantiniere_api
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
        this.cantiniere_api
          .pay(id)
          .subscribe(() => window.location.reload());
        // console.log("Commande n°" + id + " validée et payée !");
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getAllMenus();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource2.filter = filterValue;
  }

  /**
   * Code de Max
   */

  // get users list
  async getUsers() {
    const response = await this.userService.getAllUser();
    this.usersTab = response;
    this.usersTab = this.sortUsersByName(this.usersTab);
    this.dataSource.data = this.usersTab;
    /*.subscribe( (data) => {
      this.users = data.body;
      this.users = this.sortUsersByName(this.users);
      // console.log(this.users);
      this.dataSource.data = this.users;
    })*/
  }

  // function that orders users alphabetically by name
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
        window.alert(`${res.name} ${res.firstname} a été crédité de : ${creditAmount}€`);
        window.location.reload();
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
        window.alert(`${res.name} ${res.firstname} a été débité de : ${debitAmount}€`);
        window.location.reload();
        })
      }
    })
  }

  /**
   * Partie Rélesse (gestion des menus)
   */

  async getAllMenus() {
    const response = await this.cantiniere_service.getMenus();
    this.menus = response;
    console.log(this.menus);
  }



}
