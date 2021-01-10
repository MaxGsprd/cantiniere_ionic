import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewIngredientPage } from './new-ingredient.page';

describe('NewIngredientPage', () => {
  let component: NewIngredientPage;
  let fixture: ComponentFixture<NewIngredientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIngredientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewIngredientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
