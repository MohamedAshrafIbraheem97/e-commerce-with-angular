import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMapTo, take } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product | null>, OnDestroy {
  private productSubscription: Subscription | undefined;

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product | null> {
    const productId = route.paramMap.get('id');
    let productIdFromSubscription: number | undefined;

    // Subscribe to product service to check for existing product data
    this.productSubscription = this.productService.selectedProduct$.pipe(
    ).subscribe(res => {
      productIdFromSubscription = res.id;
    });

    if (productIdFromSubscription === -1) {
      // If there's no existing product subscription, fetch product data from the service
      return productId ? this.productService.getProductById(Number(productId)).pipe(
        catchError(() => {
          console.error('Failed to fetch product data');
          return of(null);
        })
      ) : of(null);
    } else {
      // If there's an existing product subscription, return null
      return of(null);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from product subscription to avoid memory leaks
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
