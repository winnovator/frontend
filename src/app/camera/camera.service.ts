import { DesignShop } from '../models/designshop';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CameraService {
  ds: DesignShop;
  private url;
  public uploadStatus: BehaviorSubject<string> = new BehaviorSubject<string>('');
  data = this.uploadStatus.asObservable();
  constructor(private http: HttpClient) { }

  updateStatus(message: string) {
    this.uploadStatus.next(message);
  }
  // Send picture to backend
  sendPicture(blob: any, name: string) {
    this.updateStatus('Upload status: Upload gestart');
    if (localStorage.getItem('ds') !== null) {
      this.ds = JSON.parse(localStorage.getItem('ds'));
      this.url = `${environment.apiUrl}UploadImage/${this.ds.id}`;
      this.uploadFile(blob, name, this.url).pipe(catchError(this.handleError))
        .subscribe(
          (data) => {
            this.updateStatus('POST call gelukt');
          },
          (response) => {
            this.updateStatus('Upload status: ' + response);
          },
          () => {
            this.updateStatus('Upload status: Upload gelukt');
          });
    } else {
      this.updateStatus('Upload status: Geen sessionID beschikbaar');
    }
  }

  uploadFile(blob: any, name: string, url: string): Observable<any> {
    const formData = new FormData();
    formData.append('uploadedFile', blob, name);
    const httpOptions: any = {
      body: formData,
      observe: 'response',
      responseType: 'text',
      headers: new HttpHeaders({
      })
    };
    return this.http.request('post', url, httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    if (error.status === 404) {
      return throwError('Upload mislukt, er is geen werkvorm actief.');
    } else if (error.status === 401) {
      return throwError('Upload mislukt, login fout.');
    }  else {
      return throwError('Er is iets misgegaan, probeer het nog eens.');
    }
  }

  // convert file to Base64
  public firstFileToBase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      const fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('Geen bestand gevonden'));
      }
    });
  }
}

