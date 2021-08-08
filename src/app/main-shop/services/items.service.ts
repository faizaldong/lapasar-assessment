import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '@src/environments/environment'
import { IProducts } from '../interfaces/products.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  apiUrl: string
  constructor(private _http: HttpClient) {
    this.apiUrl = `${environment.domain}${environment.products}`
  }

  get headers() {
    return new HttpHeaders().set('apikey', 'YXBpa2V5OmVwaS1hcGkxMjM')
  }
  
  getProducts(prodID = '', imageFile = ''): Observable<IProducts> {
    if (Boolean(prodID) && Boolean(imageFile))
      this.apiUrl = `${this.apiUrl}/${prodID}/${imageFile}`
    
    return this._http.get<IProducts>(`${this.apiUrl}`, { 'headers': this.headers })
  }
}
