import { DesignShop } from '../models/designshop';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

  updateStatus(message: string){
    this.uploadStatus.next(message);
  }
  // Send picture to backend
  sendPicture(blob: any, name: string) {
      this.updateStatus('uploading');
      if (localStorage.getItem('ds') !== null) {
      this.ds = JSON.parse(localStorage.getItem('ds'));
      this.url = `${environment.apiUrl}UploadImage/${this.ds.id}`;
      this.uploadFile(blob, name, this.url).pipe(catchError(this.handleError))
        .subscribe(
          (data) => {
            this.updateStatus('POST call successful value returned in body');
          },
          response => {
            this.updateStatus('Upload error');
          },
          () => {

            this.updateStatus('Upload complete');
          });
    } else {
      this.updateStatus('No sessionID available');
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
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      //this.updateStatus('Upload error: ' + error.error);
    } else {
      //this.updateStatus('Upload error 404: ');
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    this.updateStatus('Something bad happened; please try again later.');
    return throwError('Something bad happened; please try again later.');
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
        reject(new Error('No file found'));
      }
    });
  }


}

