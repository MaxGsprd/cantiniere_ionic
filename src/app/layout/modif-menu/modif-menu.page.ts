import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CantiniereService } from 'src/app/services/cantiniere.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-modif-menu',
  templateUrl: './modif-menu.page.html',
  styleUrls: ['./modif-menu.page.scss'],
})
export class ModifMenuPage implements OnInit {

  menuId : number;
  menu: any;
  menuForm: FormGroup;
  //weeks = new FormArray([]);
  idMeals = new FormArray([]);
  weekString = [];
  meals = [];
  current_meal = [];

  constructor(private route: ActivatedRoute, private cantiniere_service: CantiniereService, private fb: FormBuilder, private meal_service: MealService) { 
    this.menuId = parseInt(this.route.snapshot.paramMap.get('menuId'));
  }

  ngOnInit() {
    this.getMenuById(this.menuId);
    this.getMeals();
    this.initForm();
  }

  async getMeals() {
    const response = await this.meal_service.findAll();
    this.meals = response;
    console.log(this.meals);
  }

  async getMenuById(menuId: number) {
    const response = await this.cantiniere_service.getMenuById(menuId);
      this.menu = response;
      this.getImageMenu(this.menu.id);
  }

  async getImageMenu(menuId: number) {
    const response = await this.cantiniere_service.getImageMenus(this.menu.id);
    if(this.menu.imageId === response.id){
        this.menu.img64 = response.image64;
        this.menu.imgPath = response.imagePath;
    }
    this.patchForm();
  }


  initForm() {
    this.menuForm = this.fb.group({
      description: [''],
      label: [''],
      image : this.fb.group({
        imagePath: [''],
        image64: ['']
      }),
      priceDF: [''],
      availableForWeeks: [''],
      mealIds: [this.idMeals]
    })
  }

  patchForm() {
    this.menu.meals.forEach(element => {
      this.current_meal.push({id: element.id, label: element.label})
    })
    this.weekString = this.menu.availableForWeeks;
    this.menuForm.setValue({
      description: '',
      label: this.menu.label,
      image: {
        imagePath: this.menu.imgPath,
        image64: this.menu.img64
      },
      priceDF: this.menu.priceDF,
      availableForWeeks: this.weekString.toString(),
      mealIds: ['']
    });
    console.log(this.menuForm.value);
  }

  deleteCurrentMeal(id_meal) {
    var index = this.current_meal.map(x => {
      return x.id;
    }).indexOf(id_meal);
    this.current_meal.splice(index, 1);
  }

  addMeals() {
    this.idMeals.push(new FormControl(''));
  }

  removeMeals(index) {
    this.idMeals.removeAt(index);
  }
  
  modifMenu() {
    var form = this.menuForm.value;
    var id_meal_current = [];
    this.current_meal.forEach(element => {
      id_meal_current.push(element.id);
    })
    var mealIdTab = id_meal_current.concat(this.idMeals.value);
    var weekTab = form.availableForWeeks.split(',').map(function(item)  {
      return parseInt(item);
    })

    var obj = {
      description: form.description,
      label: form.label,
      priceDF: form.priceDF,
      image: {
        imagePath: form.image.imagePath,
        image64: form.image.image64
      },
      availableForWeeks: weekTab,
      mealIds: mealIdTab
    };
    console.log(obj);
    return this.cantiniere_service.updateMenu(this.menuId, JSON.stringify(obj))
    .then(res => {
      //console.log('res', res);
      window.location.assign('/admin/gestion-menu');
    })
    .catch(err => {
      //console.log('err', err);
    })
  }

}
