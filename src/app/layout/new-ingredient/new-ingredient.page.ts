import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.page.html',
  styleUrls: ['./new-ingredient.page.scss'],
})
export class NewIngredientPage implements OnInit {

  img64 : any;
  igrdForm : FormGroup;

  constructor(private fb: FormBuilder, private ingredient_service: IngredientService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.igrdForm = this.fb.group({
      description: [''],
      label: [''],
      image : this.fb.group({
        imagePath: [''],
        image64: ['']
      })
    });
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

  async createIgrd() {
    var form = this.igrdForm.value
    if(form.image.imagePath != "") form.image.image64 = "data:image/jpeg;base64,"+this.img64;
    return await this.ingredient_service.addIgrd(JSON.stringify(form))
    .then(res => {
      //console.log('res : ', res);
      window.location.assign('/admin/gestion-meal');
    })
    .catch(err => {
      //console.log('err : ', err);
    })

  }

}
