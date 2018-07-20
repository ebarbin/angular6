import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editMode = false;
  editIngredientIndex: number;

  subs: Subscription;
  @ViewChild('f') ingredientForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subs = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editIngredientIndex = index;
      const editIngredient = this.shoppingListService.getIngredient(index);
      this.ingredientForm.form.patchValue({name: editIngredient.name, amount: editIngredient.amount});
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onReset() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onAddIngredient(form: NgForm) {
    const name: string = form.value.name;
    const amount: number = form.value.amount;
    if (!this.editMode) {
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
    } else {
      this.shoppingListService.updateIngredient(this.editIngredientIndex, name, amount);
      this.editMode = false;
      this.editIngredientIndex = null;
    }
    this.ingredientForm.reset();
  }
}
