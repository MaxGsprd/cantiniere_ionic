import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CantiniereService } from 'src/app/services/cantiniere.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { CartPage } from '../cart/cart.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-meal',
  templateUrl: './detail-meal.page.html',
  styleUrls: ['./detail-meal.page.scss'],
  providers: [CartPage]
})
export class DetailMealPage implements OnInit {

  mealId : number;
  meal: any;
  mealImg64: String;
  quantity = 0;
  igrdBool = false;

  constructor(private route: ActivatedRoute, private cantiniere_service: CantiniereService, private igrd_service: IngredientService, private cart: CartPage, private alertCtrl:AlertController) { }

  ngOnInit() {
    //console.log(this.route.snapshot.paramMap)
    this.mealId = parseInt(this.route.snapshot.paramMap.get("mealId"));
    this.getMealById();
    this.getImageMeal();
  }

  async getMealById() {
    const response = await this.cantiniere_service.getMealById(this.mealId);
    //console.log(response);
    if(response.description == undefined) {
      response.description = "aucune description";
    }
    this.meal = response;
    if(this.meal.ingredients != undefined) {
      this.igrdBool = true;
      this.meal.ingredients.forEach(element => {
        this.getIgrdImage(element.id);
      });
    }
  }

  async getIgrdImage(igrd_id: number) {
    const response = await this.igrd_service.getIgrdImage(igrd_id);
    this.meal.ingredients.forEach(element => {
      if(element.imageId == response.id) {
        element.img64 = response.image64;
      }
      if(element.description == undefined) {
        element.description = "aucune description";
      }
    });
  }

  async getImageMeal() {
    const response = await this.cantiniere_service.getImageMeal(this.mealId);
    this.mealImg64 = response.image64;
  }

  changeQuantity(quantity) {
    if(quantity >= 0) this.quantity = quantity;
  }

  addToCart() {
    console.log(this.meal)
    const orderMeal = {
      quantity: this.quantity,
      menuId: null,
      mealId: this.mealId
    }
    let menuLabel = this.meal.label;
    this.cart.addToCart(orderMeal)
    this.showAlert(menuLabel);
  }

  async showAlert(menuLabel:string) {  
    const alert = await this.alertCtrl.create({  
      header: 'Commande passée avec succès',  
      subHeader: `votre commande de ${menuLabel} à été prise  en compte`,  
      buttons: ['J\'ai compris']  
    });  
    await alert.present();  
    await alert.onDidDismiss();  
    window.location.reload(); 
  } 

}
