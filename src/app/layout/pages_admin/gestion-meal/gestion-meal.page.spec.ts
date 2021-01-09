import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionMealPage } from './gestion-meal.page';

describe('GestionMealPage', () => {
  let component: GestionMealPage;
  let fixture: ComponentFixture<GestionMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionMealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
