import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  currentUser: any;
  readonly : Boolean = true;
  userForm: FormGroup;
  name: String;
  firstname: String;
  email: String;
  phone: String;
  address: String;
  postalCode: String;
  town: String;

  constructor(private fb: FormBuilder, private token_service: TokenStorageService, private user_service: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token_service.getUser().user;
    console.log(this.currentUser);
    this.getUserImg();
    this.generateUserForm();
  }

  async getUserImg() {
    var id_user: number = this.currentUser.id;
    const response = await this.user_service.getImgUser(id_user);
    this.currentUser.image64 = response.image64;
  }

  generateUserForm() {
    this.userForm = this.fb.group({
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
    });
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

}
