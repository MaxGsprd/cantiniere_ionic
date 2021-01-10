import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.page.html',
  styleUrls: ['./new-meal.page.scss'],
})
export class NewMealPage implements OnInit {

  img64 : any;
  mealForm : FormGroup;
  weeks = new FormArray([]);
  idIgrds = new FormArray([]);
  igrds = [];

  constructor(private fb: FormBuilder, private ingredient_service: IngredientService, private meal_service: MealService) { }

  ngOnInit() {
    this.initForm();
    this.getIgrds();
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
      availableForWeeks: [this.weeks],
      ingredientsId: [this.idIgrds],
      category: [0]
    })
  }

  async getIgrds() {
    const response = await this.ingredient_service.getAllIgrd();
    this.igrds = response;
  }

  addWeeks() {
    this.weeks.push(new FormControl(''));
  }

  removeWeeks(index) {
    this.weeks.removeAt(index);
  }

  addIgrds() {
    this.idIgrds.push(new FormControl(''));
  }

  removeIgrds(index) {
    this.idIgrds.removeAt(index);
  }

  handleFileSelect($event) {
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
  }

  async createMeal() {
    var form = this.mealForm.value;
    if(form.image.imagePath != "") form.image.image64 = "data:image/jpeg;base64,"+this.img64;
    form.priceDF =+ form.priceDF;
    var obj = {
      description: form.description,
      label: form.label,
      priceDF: form.priceDF,
      image: {
        imagePath: form.image.imagePath,
        image64: form.image.image64
      },
      availableForWeeks: form.availableForWeeks.value,
      ingredientsId: form.ingredientsId.value,
      category: form.category
    };
    
    return await this.meal_service.addMeal(JSON.stringify(obj))
    .then(res => {
      //console.log("res : ", res);
      window.location.assign('/admin/gestion-meal');
    })
    .catch(err => {
      //console.log("err : ", err);
    })

  }

}
