import { Login } from './../models/login';
import { TestBed, tick , fakeAsync} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenApiService } from './token-api.service';

describe('TokenApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: TokenApiService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TokenApiService],
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TokenApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    service = TestBed.get(TokenApiService);
    expect(service).toBeTruthy();
  });

  it('it should send username and password', (done) => {
    const login: Login = new Login();
    login.email = 'test@test.nl';
    login.password = 'doeternuniettoe';
    service.getJWTToken();
    const req = httpTestingController.expectOne('https://localhost:44344/api/token/');
    expect(req.request.body).toEqual(login);
    req.flush('203949');
    done();
  });

  it('it should get a token', fakeAsync (() => {
    const login: Login = new Login();
    login.email = 'test@test.nl';
    login.password = 'doeternuniettoe';
    service.getJWTToken();
    const req = httpTestingController.expectOne('https://localhost:44344/api/token/');
    const token = {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6I' };
    req.flush(token);
    tick();
    expect(localStorage.getItem('jwttoken')).toEqual(jasmine.arrayContaining(['token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6I']) as any);
    }));
});
