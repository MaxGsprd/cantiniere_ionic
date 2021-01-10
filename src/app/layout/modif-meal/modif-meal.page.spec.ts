import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifMealPage } from './modif-meal.page';

describe('ModifMealPage', () => {
  let component: ModifMealPage;
  let fixture: ComponentFixture<ModifMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifMealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
