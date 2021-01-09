import { Component, OnInit } from '@angular/core';
import { CantiniereService } from 'src/app/services/cantiniere.service';
import { MealService } from 'src/app/services/meal.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

const EMPTY_CART = [];

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart;
  displayedColumns: string[] = ['label', 'price', 'quantity', 'del'];
  cartTable = [];
  cartTotal = 0;
  userWallet:number;
  menus = [];
  quantity;

  constructor(private mealService:MealService, private userService:UserService, private menuService:CantiniereService, private token_service:TokenStorageService) { 
    if (this.cart = {}) this.cart = EMPTY_CART;
    if (localStorage.getItem('cart')) this.cart = JSON.parse(localStorage.getItem('cart'));
    this.fillCartTable();
    if (this.token_service.getUser()) this.getUserWallet();
  }

  ngOnInit() {
    if (localStorage.getItem('cart')) this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  addToCart(menu) {
    this.cart.push(menu)
    this.quantity = this.quantity +1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    //this.fillCartTable();
  }

  order() {
    /*if (this.token_service.getUser()) {
      if (this.userWallet < this.cartTotal) {
        this.openSnackBar('no money');
      } else {
        this.orderService.addOrder({
          userId: this.token_service.getUser().user.id,
          constraintId: 1,
          quantity: this.cart
        }).subscribe(data => console.log(data))
      }
      
    } else {
      this.openSnackBar('not log');
    }*/
    
  }

  resetCart() {
    this.cart = EMPTY_CART;
  }

  fillCartTable() {
    this.cart.forEach(row => {
      this.getMeal(row.mealId).subscribe(
        meal =>  {
          let obj = {
            id: meal["id"],
            label: meal["label"],
            price: meal["priceDF"],
            quantity: row.quantity
          }
          let found = this.cartTable.find(element => element["id"] == meal["id"]) 
          //console.log(found)
          if(typeof found === 'undefined') this.cartTable.push(obj)
        
      }) 
    })
    this.getTotalPrice();
  }

  cartMenuLessQuantity(id) {
    //console.log(this.cart)
    this.cart.forEach(row => {
      if (row.menuId == id) {
        row.quantity--;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    })

    this.cartTable.forEach(row => {
      if (row.id == id) {
        //console.log(row)
        row.quantity--;
      }
    })
    
  }

  cartMenuMoreQuantity(id) {
    this.cart.forEach(row => {
      if (row.menuId == id) {
        row.quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    })

    this.cartTable.forEach(row => {
      if (row.id == id) {
        //console.log(row)
        row.quantity++;
      }
    })
  }

  cartMenuDelete(id) {
    let newCart = this.cart.filter(row => row.menuId != id) 
    this.cart = newCart

    let newCartTable = this.cartTable.filter(row => row.id != id)
    this.cartTable = newCartTable;

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  openSnackBar(why) {
    /*switch (why) {
      case 'not log':
        this._snackBar.openFromComponent(LoginSnackbarComponent, {
          duration: 20000,
        });
        break;
    
      case 'no money':
        this._snackBar.openFromComponent(WalletSnackbarComponent, {
          duration: 20000,
        });
        break;
    }*/
    
  }

  async getUserWallet() {
    const response = await this.userService.getUserById(this.token_service.getUser().user.id);
    this.userWallet = response.wallet
  }

  getMeal(id) {
    return this.mealService.findById(id)
  }

  getMenu(id) {
    return this.menuService.findById(id)
  }

  getTotalPrice() {
    for (let index = 0; index < this.cart.length; index++) {
      const element = this.cart[index];
      this.getMeal(element.mealId).subscribe(meal => {
        console.log(meal)
        this.cartTotal = this.cartTotal + meal["priceDF"] * element.quantity
      })
    }
  }



}
