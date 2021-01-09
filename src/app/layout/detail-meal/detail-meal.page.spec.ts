import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailMealPage } from './detail-meal.page';

describe('DetailMealPage', () => {
  let component: DetailMealPage;
  let fixture: ComponentFixture<DetailMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
