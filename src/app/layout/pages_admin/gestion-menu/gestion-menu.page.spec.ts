import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionMenuPage } from './gestion-menu.page';

describe('GestionMenuPage', () => {
  let component: GestionMenuPage;
  let fixture: ComponentFixture<GestionMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
