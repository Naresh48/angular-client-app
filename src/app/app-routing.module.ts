import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inbox', pathMatch: 'full' },
  {
    path: 'inbox',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./inbox/inbox.module').then(mod => mod.InboxModule)
  },
  {
    path: 'map',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./map/map.module').then(mod => mod.MapModule)
  },
  {
    path: 'products',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./products/products.module').then(mod => mod.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
