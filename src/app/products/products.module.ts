import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductAddUpdateComponent } from './product-add-update/product-add-update.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddUpdateComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
