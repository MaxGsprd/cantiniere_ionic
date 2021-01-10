import { Component, OnInit } from '@angular/core';
import { CantiniereService } from 'src/app/services/cantiniere.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-menu',
  templateUrl: './gestion-menu.page.html',
  styleUrls: ['./gestion-menu.page.scss'],
})
export class GestionMenuPage implements OnInit {

  menus = [];
  panelOpenState = false;
  changeImageMenu = false;
  imagePath;
  img64 : any;

  constructor(private router: Router, private cantiniere_service: CantiniereService) { }

  ngOnInit() {
    this.getAllMenus();
  }

  async getAllMenus() {
    const response = await this.cantiniere_service.getMenus();
    this.menus = response;
    console.log(this.menus);
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

  async modifierImage(id: number) {
    var obj = {
      imagePath: this.imagePath,
      image64: "data:image/jpeg;base64,"+this.img64
    }
    console.log(obj);

    return await this.cantiniere_service.updateMenuImage(id, JSON.stringify(obj))
    .then(res => {
      console.log("res", res);
    })
    .catch(err => {
      console.log("err", err);
    })

  }

  annulerImage() {
    this.changeImageMenu = false;
  }

  modifMenu(menuId: number) {
    this.router.navigateByUrl('modif-menu/'+menuId);
  }

}
