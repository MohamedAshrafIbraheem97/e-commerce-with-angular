import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),

  ]
})
export class ProductManagementModule { }
