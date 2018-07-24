import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  private recipes: Recipe[] = [
    new Recipe(0, 'A test Recipe', 'This is a simply recipe',
    'http://www.foodtolove.com.au/assets/images/badge-collection.png',
    [
      new Ingredient('Meat', 1),
      new Ingredient('Bread', 10)
    ]),
    new Recipe(1, 'A test Recipe 2', 'This is a simply recipe 2',
    'http://www.foodtolove.com.au/assets/images/badge-collection.png', [
      new Ingredient('Apple', 3),
      new Ingredient('Bun', 7)
    ])
  ];

  getRecipe(id: number) {
    return this.recipes.slice().find((recipe: Recipe, index: number) => {
      return recipe.id === id;
    });
  }

  getRecipes() {
    return this.recipes.slice(); // slice return a copy of array, NOT the same reference!
  }

  addRecipe(recipe: Recipe) {
    recipe.id = new Date().getMilliseconds();
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipeUpdated: Recipe) {
    const recipe = this.recipes.find((r: Recipe) => {
      return r.id === id;
    });
    recipe.name = recipeUpdated.name;
    recipe.description = recipeUpdated.description;
    recipe.imagePath = recipeUpdated.imagePath;
    recipe.ingredients = recipeUpdated.ingredients;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addIngredient(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  deleteRecipe(recipe: Recipe) {
    const index = this.recipes.findIndex(rec => rec.id === recipe.id);
    this.recipes = this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }
}
