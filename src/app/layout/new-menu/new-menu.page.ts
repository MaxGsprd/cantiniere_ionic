import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CantiniereService } from 'src/app/services/cantiniere.service'
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.page.html',
  styleUrls: ['./new-menu.page.scss'],
})
export class NewMenuPage implements OnInit {

  img64 : any;
  menuForm : FormGroup;
  weeks = new FormArray([]);
  idMeals = new FormArray([]);
  meals = [];

  constructor(private fb: FormBuilder, private meal_service: MealService, private cantiniere_service : CantiniereService) { }

  ngOnInit() {
    this.initForm();
    this.getMeals();
  }

  initForm() {
    this.menuForm = this.fb.group({
      description: [''],
      label: [''],
      image : this.fb.group({
        imagePath: [''],
        image64: ['']
      }),
      priceDF: [0],
      availableForWeeks: [this.weeks],
      mealIds: [this.idMeals]

    })
  }

  async getMeals() {
    const response = await this.meal_service.findAll();
    this.meals = response;
  }

  addWeeks() {
    this.weeks.push(new FormControl(''));
  }

  removeWeeks(index) {
    this.weeks.removeAt(index);
  }

  addMeals() {
    this.idMeals.push(new FormControl(''));
  }

  removeMeals(index) {
    this.idMeals.removeAt(index);
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

  async createMenu() {
    var form = this.menuForm.value;
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
      mealIds: form.mealIds.value
    };

    return await this.cantiniere_service.addMenu(JSON.stringify(obj))
    .then(res => {
      //console.log("res : ", res);
      window.location.assign('/admin/gestion-menu');
    })
    .catch(err => {
      //console.log("err : ", err);
    })

  }

}
