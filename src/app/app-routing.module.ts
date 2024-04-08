import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Default route - Redirect to product list
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  // Lazy-loaded module route
  {
    path: 'products',
    loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
