import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {  Product } from '../models/product.model';
import { environment } from 'src/environments/environment.development';
import { productEndpoints } from 'src/app/core/endpoints/products';
import { categoriesEndpoints } from 'src/app/core/endpoints/categories';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.baseUrl;
  selectedProduct$: BehaviorSubject<Product>= new BehaviorSubject<Product>(
    {
      id: -1,
    title: '',
    description: '',
    price: -1,
    category: {
      id: 0,
      name: '',
      image: ''
    },
    images: [],
    }
  );

  constructor(private http: HttpClient) { }

  getProducts(offset: string, limit: string, categoryId:string = ''):Observable<Product[]> {
    // Create a new HttpParams object to hold the query parameters
    let params = new HttpParams();
    
    // Set the offset and limit parameters
    params = params.set('offset', offset);
    params = params.set('limit', limit);
    params = params.set('categoryId', categoryId);
    
    return this.http.get<Product[]>(`${this.baseUrl}${productEndpoints.allProducts}`, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}${productEndpoints.productById}${id}`);
  }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}${categoriesEndpoints.allCategories}`);
  }
}
