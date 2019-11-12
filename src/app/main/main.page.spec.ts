import { TabsService } from './../tabs/tabs.service';
import { TabsPage } from './../tabs/tabs.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MainPage } from './main.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';


describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPage],
      providers: [TabsService, TabsPage],
      imports: [IonicModule.forRoot(), [HttpClientTestingModule], [FormsModule ]]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
