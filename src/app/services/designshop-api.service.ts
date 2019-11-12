import { DesignShop } from './../models/designshop';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DesignshopApiService {

  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  public getDesignShops(): Observable<DesignShop[]> {
    return this.http.get(`${this.url}DesignShop/`).pipe(map((response: any) => response));
  }
}
