import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CameraPage } from './camera.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CamComponent } from './cam/cam.component';

describe('CameraPage', () => {
  let component: CameraPage;
  let fixture: ComponentFixture<CameraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CameraPage, CamComponent],
      imports: [IonicModule.forRoot(), [HttpClientTestingModule]]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
