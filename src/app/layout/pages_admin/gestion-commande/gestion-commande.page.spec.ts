import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionCommandePage } from './gestion-commande.page';

describe('GestionCommandePage', () => {
  let component: GestionCommandePage;
  let fixture: ComponentFixture<GestionCommandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCommandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
