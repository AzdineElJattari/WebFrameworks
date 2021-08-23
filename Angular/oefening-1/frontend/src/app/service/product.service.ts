import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable()
export class ProductService {
  private productserviceURI: string = 'http://localhost:3001/api';
  private contentHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.contentHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
  }

  getAllProducts(): Observable<Product[]> {
    let url = `${this.productserviceURI}`;
    return this.http.get<Product[]>(url);
  }

  searchProduct(name: string): Observable<Product[]> {
    let url = `${this.productserviceURI}/search`;
    return this.http.post<Product[]>(url, `name=${name}`, {
      headers: this.contentHeaders,
    });
  }
}
