import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CameraPage } from './camera.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CameraPage', () => {
  let component: CameraPage;
  let fixture: ComponentFixture<CameraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CameraPage],
      imports: [IonicModule.forRoot(), [HttpClientTestingModule]]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Open pick file or create camera window', () => {
    const file = new File(['f'], 'test-file.jpg', { lastModified: new Date().getTime(), type: 'image/jpeg' });
    component.openPWAPhotoPicker();
    fixture.whenStable().then(() => {
      expect(component.pwaphoto).toHaveBeenCalled();
    });
  });
});
