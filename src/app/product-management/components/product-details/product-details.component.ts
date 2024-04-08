import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    category: {} as Category,
    images: []
  };
  private productSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // If resolved product is not available, subscribe to selectedProduct BehaviorSubject
    this.productSubscription = this.productService.selectedProduct$.subscribe((product: Product) => {
      this.product = product;
    });
    // Apply resolver to fetch product data only if there's no data 
    if (this.product.id === -1) {
      this.product = this.route.snapshot.data['product'];
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from product subscription to avoid memory leaks
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
