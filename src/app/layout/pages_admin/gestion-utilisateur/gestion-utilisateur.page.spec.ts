import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionUtilisateurPage } from './gestion-utilisateur.page';

describe('GestionUtilisateurPage', () => {
  let component: GestionUtilisateurPage;
  let fixture: ComponentFixture<GestionUtilisateurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionUtilisateurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionUtilisateurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
