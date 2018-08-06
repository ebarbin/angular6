import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  subs: Subscription;

  selectedId: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.getIngredients().subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });

    this.subs = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        this.selectedId = null;
      });
  }

  onEditItem(ingredient: Ingredient) {
    this.selectedId = ingredient.id;
    this.shoppingListService.startedEditing.next(ingredient);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
