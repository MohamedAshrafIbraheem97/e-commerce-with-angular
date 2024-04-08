import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private productService:ProductService) {
    
  }
  onProductClick(product: Product): void {
    // Emit the selected product to the selectedProduct BehaviorSubject
    this.productService.selectedProduct$.next(product);
  }
}
