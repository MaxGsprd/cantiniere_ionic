import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { Commande } from '../../../models/Commande';
import { User } from '../../../models/User';
import { ConfirmDialogComponent } from '../../../component/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gestion-commande',
  templateUrl: './gestion-commande.page.html',
  styleUrls: ['./gestion-commande.page.scss'],
})
export class GestionCommandePage implements OnInit {

  commandes_passees: Commande[] = [];
  expandedElement: User | null;
  todayOrders: Commande[] = [];
  dataSourceToday = new MatTableDataSource<Commande>(this.todayOrders);
  users: User[] = [];
  userId: any;
  displayedColumns2: string[] = ['id', 'idUser', 'firstName', 'name', 'creationDate', 'creationTime', 'status', 'action'];
  dataSource2 = new MatTableDataSource<Commande>(this.commandes_passees);

  constructor(
    private order_service: OrderService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.order_service.findAll().subscribe((data) => {
      this.commandes_passees = data;
      this.dataSource2.data = this.commandes_passees;
      console.log('commandes passées :',this.commandes_passees);
    });
    this.order_service.findTodayOrders().subscribe(data => {
      this.todayOrders = data
      this.dataSourceToday.data = this.todayOrders;
      console.log('commandes du jour :',this.todayOrders);
    })

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
        this.order_service
          .cancel(id)
          .subscribe(() => window.location.reload());
          console.log("Commande n°" + id + " annulée !");
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
          console.log("Commande n°" + id + " validée et payée !");
      }
    });
  }

  ngOnInit(): void {

  }

  applyFilter(filterValue: string) {
    if(filterValue.length >= 3) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource2.data = this.commandes_passees;
      this.dataSource2.filter = filterValue;
    }
    
  }
}
