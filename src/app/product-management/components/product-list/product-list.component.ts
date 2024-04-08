import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { ProductService } from '../../services/product.service';
import {  Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  selectedCategoryId: string = '';
  private productsSubscription: Subscription | undefined;
  private categoriesSubscription: Subscription | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Load the first products page
    this.loadProducts(this.currentPage, this.itemsPerPage);
    // Request executed once to get the total number of items
    this.getTotalItems();
    // Load all categories
    this.loadCategories();
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscriptions to prevent memory leaks
    this.productsSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
  }

  // Get total items
  getTotalItems(): void {
    this.productsSubscription = this.productService.getProducts('', '', this.selectedCategoryId)
      .subscribe((data: Product[]) => {
        // Get totalItems from the API
        this.totalItems = data.length;
      });
  }

  // Get the products paginated
  private loadProducts(currentPage: number, itemsPerPage: number, category: string = ''): void {
    const offset = (currentPage - 1) * itemsPerPage;
    this.productsSubscription = this.productService.getProducts(offset.toString(), this.itemsPerPage.toString(), category)
      .pipe(
        // filter products to get only products that have a correct image URL 
        map((data: Product[]) => data.filter(product => this.areAllImageUrlsValid(product.images)))
      )
      .subscribe((filteredProducts: Product[]) => {
        this.products = filteredProducts;
      });
  }
  
  // Function to check if all image URLs in the array are valid (start with "https://")
  private areAllImageUrlsValid(imageUrls: string[]): boolean {
    return imageUrls.every(url => url.startsWith("https://"));
  }
  
  private isValidImageUrl(url: string): boolean {
    // Check if the URL starts with "https://"
    return url.startsWith("https://");
  }

  private loadCategories(): void {
    this.categoriesSubscription = this.productService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  // Is called when a page is changed to get the next page
  getNextPage(event: any): void {
    this.currentPage = event.page;
    this.loadProducts(this.currentPage, this.itemsPerPage, this.selectedCategoryId);
  }

  onCategoryRadioButtonChange(categoryId: number): void {
    // Set the selected category ID directly
    this.selectedCategoryId = categoryId.toString();
    // Reload products based on the updated selected category ID
    this.currentPage = 1;
    this.loadProducts(this.currentPage, this.itemsPerPage, this.selectedCategoryId);
  }
}
