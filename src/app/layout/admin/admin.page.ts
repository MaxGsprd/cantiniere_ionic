import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { Commande } from '../../models/Commande';
import { User } from '../../models/User';
import { ConfirmDialogComponent } from '../../component/confirm-dialog/confirm-dialog.component';
import { WalletService } from 'src/app/services/wallet.service';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxCreditComponent } from 'src/app/component/dialog-box-credit/dialog-box-credit.component';
import { DialogBoxDebitComponent } from 'src/app/component/dialog-box-debit/dialog-box-debit.component';
import { CantiniereService } from 'src/app/services/cantiniere.service';
import { MealService } from 'src/app/services/meal.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminPage implements OnInit {
  userId: any;

  commandes_passees: Commande[] = [];
  expandedElement: User | null;
  todayOrders: Commande[] = [];
  users: User[] = [];
  userId: any;
  //displayedColumns2: string[] = ['id', 'idUser', 'firstName', 'name', 'creationDate', 'creationTime', 'status', 'action'];
  //dataSource2 = new MatTableDataSource<Commande>(this.commandes_passees);

  dataSourceToday = new MatTableDataSource<Commande>(this.todayOrders);
  dataSource2 = new MatTableDataSource<Commande>(this.commandes_passees);
  //Variable Max
  usersTab: User[] = [];
  displayedColumns: string[] = ['name', 'firstname', 'wallet', 'id'];
  dataSource = new MatTableDataSource<User>(this.usersTab);
  //Variable Rélesse
  menus = [];
  meals = [];
  panelOpenState = false;
  changeImageMenu = false;
  changeImageMeal = false;
  imagePath;
  img64 : any;

  constructor(
    private router: Router,
    private order_service: OrderService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private walletService: WalletService,
    private userService: UserService,
    private cantiniere_service : CantiniereService,
    private meal_service: MealService,
    private ingredient_service: IngredientService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.order_service.findAll().subscribe((data) => {
      this.commandes_passees = data;
      //this.dataSource2.data = this.commandes_passees;
      console.log('commandes passées :',this.commandes_passees);
    });
    this.order_service.findTodayOrders().subscribe(data => {
      this.todayOrders = data
      this.dataSourceToday.data = this.todayOrders;
      console.log('commandes du jour :',this.todayOrders);
    })

    //this.dataSource2.filterPredicate = function(data, filter:string):boolean {
    //  var str1 = data.user.firstname.toLowerCase();
    //  var str2 = data.user.name.toLowerCase();
    //  var str3 = str1.concat(" ", str2);
    //  var str4 = str2.concat(" ", str1);
    //  return str1.includes(filter) || str2.includes(filter) || str3.includes(filter) || str4.includes(filter);
    //}

    this.dataSource.filterPredicate = function(data, filter:string):boolean {
      var str1 = data.firstname.toLowerCase();
      var str2 = data.name.toLowerCase();
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
    this.getAllMenus();
    this.getAllMeals();
  }

  applyFilter(filterValue: string) {
    if(filterValue.length >= 3) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.data = this.usersTab;
      //this.dataSource2.data = this.commandes_passees;
      //this.dataSource2.filter = filterValue;
      this.dataSource.filter = filterValue;
    }
    
  }

  async getAllMenus() {
    const response = await this.cantiniere_service.getMenus();
    this.menus = response;
    this.menus.forEach(element => {
      this.getImageMenu(element.id);
      if(element.meals) {
        element.meals.forEach(element_meal => {
          this.getImageMeal(element_meal.id);
        });
      }
    })
  }

  async getImageMenu(id_menu) {
    const response = await this.cantiniere_service.getImageMenus(id_menu);
    this.menus.forEach(element => {
      if(element.imageId === response.id){
        element.img = response.image64;
      }
    });
  }

  async getImageMeal(id_meal: number) {
    const response = await this.cantiniere_service.getImageMeal(id_meal);
    this.menus.forEach(element => {
      if(element.meals) {
        element.meals.forEach(element_meal => {
          if(element_meal.imageId === response.id){
            element_meal.img64 = response.image64;
          }
        });
      }
    })
  }

  modifMenu(menuId: number) {
    this.router.navigateByUrl('modif-menu/'+menuId);
  }

  modifMeal(mealId: number) {
    this.router.navigateByUrl('modif-meal/'+mealId);
  }

  voirProfil(id_user) {
    this.router.navigateByUrl('profile/'+id_user);
  }

  async getAllMeals() {
    const response = await this.meal_service.findAll();
    this.meals = response;
    this.meals.forEach(element => {
      this.imageMeal(element.id);
      if(element.ingredients){
        element.ingredients.forEach(element_igrd => {
          this.getIgrdImage(element_igrd.id);
        })
      } 
    })


  }

  async imageMeal(id_meal) {
    const response = await this.cantiniere_service.getImageMeal(id_meal);
    this.meals.forEach(element => {
      if(element.imageId === response.id){
        element.img = response.image64;
      }
    });

  }

  async getIgrdImage(id_igrd) {
    const response = await this.ingredient_service.getIgrdImage(id_igrd);
    this.meals.forEach(element => {
      if(element.ingredients) {
        element.ingredients.forEach(element_igrd => {
          if(element_igrd.imageId === response.id) {
            element_igrd.img64 = response.image64;
          }
        })
      }
    })
  }

  handleFileSelect($event) {
    this.imagePath = $event.target.value;
    var files = $event.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.img64= btoa(binaryString);
    this.changeImageMenu = true
  }

  handleFileSelectMeal($event) {
    this.imagePath = $event.target.value;
    var files = $event.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoadedMeal.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoadedMeal(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.img64= btoa(binaryString);
    this.changeImageMeal = true
  }

  async modifierImage(id: number, type: String) {
    console.log(id);
    console.log(type)
    var obj = {
      imagePath: this.imagePath,
      image64: "data:image/jpeg;base64,"+this.img64
    }
    console.log(obj);

    if(type =="menu") {
      return await this.cantiniere_service.updateMenuImage(id, JSON.stringify(obj))
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      })
    }

    if(type =="meal") {
      return await this.meal_service.updateMealImage(id, JSON.stringify(obj))
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      })
    }
  }

  annulerImage(type: String) {
    if(type == "menu") {
      this.changeImageMenu = false;
    }
    if(type == "meal") {
      this.changeImageMeal = false;
    }
  }



}
