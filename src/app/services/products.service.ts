import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'https://dummyjson.com/products/category';

  constructor(private http: HttpClient) {}

  getAllClothing(): Observable<any[]> {
    return forkJoin([
      this.http.get<any>(`${this.baseUrl}/mens-shirts`),
      this.http.get<any>(`${this.baseUrl}/mens-shoes`),
      this.http.get<any>(`${this.baseUrl}/womens-dresses`),
      this.http.get<any>(`${this.baseUrl}/womens-shoes`),
      this.http.get<any>(`${this.baseUrl}/tops`)
    ]);
  }
  getProductById(id: number) {
  return this.http.get<any>(`https://dummyjson.com/products/${id}`);
  }
}
