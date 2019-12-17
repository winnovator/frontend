import { JWTToken } from './../models/jwttoken';
import { AppToken } from './../models/apptoken';
import { DesignShop } from './../models/designshop';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DesignshopApiService {

  private url = `${environment.apiUrl}`;
  private ds: DesignShop;
  private jwtToken: JWTToken;

  constructor(private http: HttpClient) { }

  public getDesignShops(): Observable<DesignShop[]> {
    return this.http.get(`${this.url}DesignShop/`).pipe(map((response: any) => response));
  }

  public async getDesignShopAppToken(designShopId: string): Promise<AppToken> {

    return new Promise(resolve => {
      this.http.get<AppToken>(`${this.url}DesignShop/` + designShopId + '/apptoken').subscribe((response: any) => {
        if (response !== null && response !== undefined) {
          this.saveAppToken(response);
          resolve(response);
        }
      }, (error: any) => {
        resolve(null);
      });
    });
  }

  private saveAppToken(token: AppToken) {
    this.ds = new DesignShop();
    this.jwtToken = new JWTToken();
    this.ds.description = token.shopDescription;
    this.ds.id = token.shopId;
    this.jwtToken.token = token.token;
    localStorage.setItem('ds', JSON.stringify(this.ds));
    localStorage.setItem('jwttoken', JSON.stringify(this.jwtToken));
  }

  private resetAppToken() {
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('ds');
  }
}
