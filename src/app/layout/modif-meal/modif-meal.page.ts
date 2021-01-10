import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CantiniereService } from 'src/app/services/cantiniere.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-modif-meal',
  templateUrl: './modif-meal.page.html',
  styleUrls: ['./modif-meal.page.scss'],
})
export class ModifMealPage implements OnInit {

  mealId : number;
  meal: any;
  mealForm: FormGroup;
  weekString = [];
  idIgrds = new FormArray([]);
  igrds = [];
  current_igrd = [];

  constructor(private route: ActivatedRoute, private meal_service: MealService, private ingredient_service: IngredientService, private fb: FormBuilder, private cantiniere_service: CantiniereService) { 
    this.mealId = parseInt(this.route.snapshot.paramMap.get('mealId'));
  }

  ngOnInit() {
    this.getMenuById(this.mealId);
    this.getIgrds();
    this.initForm();
  }

  getMenuById(id_meal: number) {
    this.meal_service.findById(id_meal)
    .subscribe(data => {
      this.meal = data;
      this.getImageMeal(this.meal.id);
      console.log(this.meal);
    })
  }

  async getImageMeal(id_meal: number) {
    const response = await this.cantiniere_service.getImageMeal(id_meal);
    if(this.meal.imageId === response.id){
      this.meal.img64 = response.image64;
      this.meal.imgPath = response.imagePath;
  }
  this.patchForm();
  }

  async getIgrds() {
    const response = await this.ingredient_service.getAllIgrd();
    this.igrds = response;
  }

  deleteCurrentIgrd(id_igrd) {
    var index = this.current_igrd.map(x => {
      return x.id;
    }).indexOf(id_igrd);
    this.current_igrd.splice(index, 1);
  }

  addIgrds() {
    this.idIgrds.push(new FormControl(''));
  }

  removeIgrds(index) {
    this.idIgrds.removeAt(index);
  }

  initForm() {
    this.mealForm = this.fb.group({
      description: [''],
      label: [''],
      image : this.fb.group({
        imagePath: [''],
        image64: ['']
      }),
      priceDF: [0],
      availableForWeeks: [''],
      ingredientsId: [this.idIgrds],
      category: ['']
    })
  }

  patchForm() {
    if(this.meal.ingredients){
      this.meal.ingredients.forEach(element => {
        this.current_igrd.push({id: element.id, label: element.label})
      })
    }
    console.log(this.meal.imgPath);
    this.weekString = this.meal.availableForWeeks;
    this.mealForm.setValue({
      description: '',
      label: this.meal.label,
      image : {
        imagePath: this.meal.imgPath,
        image64: this.meal.img64
      },
      priceDF: this.meal.priceDF,
      availableForWeeks: this.weekString.toString(),
      ingredientsId: [''],
      category: this.meal.category
    })
  }

  modifMeal() {
    var form = this.mealForm.value;
    var id_igrd_current = [];
    if(this.current_igrd.length != 0) {
      this.current_igrd.forEach(element => {
        id_igrd_current.push(element.id);
      })
    }
    var igrdIdTab = id_igrd_current.concat(this.idIgrds.value);
    var weekTab = form.availableForWeeks.split(',').map(function(item)  {
      return parseInt(item);
    });

    var obj = {
      description: form.description,
      label: form.label,
      priceDF: form.priceDF,
      image: {
        imagePath: form.image.imagePath,
        image64: form.image.image64
      },
      availableForWeeks: weekTab,
      ingredientsId: igrdIdTab,
      category: form.category
    };

    return this.meal_service.updateMeal(this.mealId, JSON.stringify(obj))
    .then(res => {
      //console.log('res', res);
      window.location.assign('/admin/gestion-meal');
    })
    .catch(err => {
      //console.log('err', err);
    })

  }

}
