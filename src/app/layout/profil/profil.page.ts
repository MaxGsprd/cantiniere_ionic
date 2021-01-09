import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Commande } from 'src/app/models/Commande';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  imagePath;
  changeImage = false;
  img64 : any;
  id_user: any;
  currentUser: any;
  readonly : Boolean = true;
  userForm: FormGroup;
  commandes: Commande[] = [];
  panelOpenState = false;

  constructor(private fb: FormBuilder, private order_service: OrderService, private user_service: UserService, private route: ActivatedRoute, private router: Router, private token_service: TokenStorageService) { 
    this.id_user =+ this.route.snapshot.paramMap.get('idUser');
  }


  ngOnInit(): void {
    let user
    if(this.token_service.getUser()) user = this.token_service.getUser().user
    if(user && !user.isLunchLady && user.id != this.id_user) {
      window.location.replace("accueil");
    }
    this.getUserById(this.id_user);
    this.generateUserForm();
    this.recapOrder(this.id_user);
  }

  async getUserById(id_user : number) {
    const response = await this.user_service.getUserById(id_user);
    this.currentUser = response;
    console.log(this.currentUser);
    this.getUserImg(id_user);
  }

  async getUserImg(id_user:number) {
    const response = await this.user_service.getImgUser(id_user);
    this.currentUser.image64 = response.image64;
    this.patchValue();
  }

  generateUserForm() {
    this.userForm = this.fb.group({
      name: [''],
      firstname: [''],
      email: [''],
      phone: [''],
      address: [''],
      postalCode: [''],
      town: [''],
      wallet: [''],
      password: [''],
      sex: [''],
      isLunchLady: [''],
    });
  }

  patchValue() {
    this.userForm.setValue({
      name: [this.currentUser.name],
      firstname: [this.currentUser.firstname],
      email: [this.currentUser.email],
      phone: [this.currentUser.phone],
      address: [this.currentUser.address],
      postalCode: [this.currentUser.postalCode],
      town: [this.currentUser.town],
      wallet: [this.currentUser.wallet],
      password: [''],
      sex: [this.currentUser.sex],
      isLunchLady: [this.currentUser.isLunchLady],
    })
  }

  readonlyOn() {
    this.readonly = false;
  }

  readonlyOff() {
    this.readonly = true;
  }

  modificationProfile(idUser: number) {
    console.log(idUser);
    console.log(this.userForm.value);
    this.user_service.updateProfile(idUser, JSON.stringify(this.userForm.value))
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err);
    });
  }

  recapOrder(id_user: number) {
    this.order_service.findAllbyUser(id_user)
    .subscribe(data => {
      this.commandes = data;
      console.log(data);
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
    this.changeImage = true
  }

  async modifierImage() {
    var obj = {
      imagePath: this.imagePath,
      image64: "data:image/jpeg;base64,"+this.img64
    }
    console.log(obj);

    return this.user_service.updateImage(JSON.stringify(obj), this.id_user)
    .then(res => {
      console.log("res", res);
    })
    .catch(err => {
      console.log("err", err);
    })

  }

  annulerImage() {
    this.changeImage = false;
  }


}
