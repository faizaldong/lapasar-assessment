import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '@src/environments/environment'
import { IProducts } from '../interfaces/products.interface';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  apiUrl: string
  constructor(private _http: HttpClient) {
    this.apiUrl = 'http://149.28.132.97:7000/api/products'
  }

  get headers() {
    return new HttpHeaders().set('apikey', 'YXBpa2V5OmVwaS1hcGkxMjM')
  }
  
  getProducts(productId = '', filename = ''): Observable<IProducts[]> {
    if (Boolean(productId) && Boolean(filename)){
      console.log(productId, filename)
      this.apiUrl = `${this.apiUrl}/${productId}/${filename}`
      return of([])
    }
    
    return this._http.get<IProducts[]>(`${this.apiUrl}`, { 'headers': this.headers })
  }
}
