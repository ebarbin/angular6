import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  constructor() { }


  private recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is a simply recipe',
    'http://www.foodtolove.com.au/assets/images/badge-collection.png',
    [
      new Ingredient('Meat', 1),
      new Ingredient('Bread', 10)
    ]),
    new Recipe('A test Recipe 2', 'This is a simply recipe 2',
    'http://www.foodtolove.com.au/assets/images/badge-collection.png', [
      new Ingredient('Apple', 3),
      new Ingredient('Bun', 7)
    ])
  ];

  getRecipes() {
    return this.recipes.slice(); // slice return a copy of array, NOT the same reference!
  }
}
