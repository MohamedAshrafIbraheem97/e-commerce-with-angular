import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductResolver } from './resolvers/product.resolver';

const routes: Routes = [
  // Default route - Redirect to product list
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  // Product list route
  { path: 'list', component: ProductListComponent },
  // Product details route
  { path: 'details/:id', component: ProductDetailsComponent,
    resolve: {
      product: ProductResolver
    }
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
