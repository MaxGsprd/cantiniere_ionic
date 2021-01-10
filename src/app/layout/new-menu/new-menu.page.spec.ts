import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewMenuPage } from './new-menu.page';

describe('NewMenuPage', () => {
  let component: NewMenuPage;
  let fixture: ComponentFixture<NewMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
