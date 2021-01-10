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

  todayOrders: Commande[] = [];
  dataSourceToday = new MatTableDataSource<Commande>(this.todayOrders);
  displayedColumns2: string[] = ['id', 'idUser', 'firstName', 'name', 'creationDate', 'creationTime', 'status', 'action'];

  constructor(private order_service: OrderService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getTodayOrders();
  }
    
  getTodayOrders(){
    this.order_service.findTodayOrders().subscribe(data => {
      this.todayOrders = data
      this.dataSourceToday.data = this.todayOrders
    })
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
