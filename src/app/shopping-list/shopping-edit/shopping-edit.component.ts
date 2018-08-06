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
  editIngredient: Ingredient;

  subs: Subscription;
  @ViewChild('f') ingredientForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subs = this.shoppingListService.startedEditing.subscribe((ingredient: Ingredient) => {
      this.editMode = true;
      this.editIngredient = ingredient;
      this.ingredientForm.form.patchValue({name: ingredient.name, amount: ingredient.amount});
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
    this.editIngredient = null;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIngredient);
    this.onClear();
  }

  onSubmit(form: NgForm) {
    const name: string = form.value.name;
    const amount: number = form.value.amount;
    if (!this.editMode) {
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
    } else {
      this.editIngredient.name = name;
      this.editIngredient.amount = amount;
      this.shoppingListService.updateIngredient(this.editIngredient);
      this.editMode = false;
      this.editIngredient = null;
    }
    this.ingredientForm.reset();
  }
}
