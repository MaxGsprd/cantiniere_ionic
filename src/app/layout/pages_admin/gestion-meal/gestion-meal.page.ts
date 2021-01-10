import { Component, OnInit } from '@angular/core';
import { CantiniereService } from 'src/app/services/cantiniere.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { MealService } from 'src/app/services/meal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-meal',
  templateUrl: './gestion-meal.page.html',
  styleUrls: ['./gestion-meal.page.scss'],
})
export class GestionMealPage implements OnInit {

  meals = [];
  panelOpenState = false;
  changeImageMeal = false;
  imagePath;
  img64 : any;

  constructor(private router: Router, private meal_service: MealService, private cantiniere_service: CantiniereService, private ingredient_service: IngredientService ) { }

  ngOnInit() {
    this.getAllMeals();
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
    this.changeImageMeal = true
  }

  async modifierImage(id: number) {
    var obj = {
      imagePath: this.imagePath,
      image64: "data:image/jpeg;base64,"+this.img64
    }
    console.log(obj);

    return await this.meal_service.updateMealImage(id, JSON.stringify(obj))
    .then(res => {
      console.log("res", res);
    })
    .catch(err => {
      console.log("err", err);
    })

  }

  annulerImage() {
    this.changeImageMeal = false;
  }

  modifMeal(mealId: number) {
    this.router.navigateByUrl('modif-meal/'+mealId);
  }

}
