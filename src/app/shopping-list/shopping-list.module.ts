import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    SharedModule,
    FormsModule
  ],
  exports: [
    FormsModule
  ]
})
export class ShoppingListModule {

}
