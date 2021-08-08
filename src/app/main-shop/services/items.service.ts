import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string
  constructor(private _http: HttpClient) {
    this.apiUrl = `${environment.domain}${environment.products}`
  }
  
  getProducts(prodID: string, imageFile: string): Observable<any> {
    if (Boolean(prodID) && Boolean(imageFile))
      this.apiUrl = `${this.apiUrl}/${prodID}/${imageFile}`
    return this._http.get<any>(`${this.apiUrl}`)
  }
}
