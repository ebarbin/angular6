import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Response } from '../shared/response.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipesChanged = new Subject<Recipe[]>();

  constructor(private httpClient: HttpClient, private shoppingListService: ShoppingListService) { }

  private recipes: Recipe[] = [];

  getRecipe(id: number) {
    return this.recipes.slice().find((recipe: Recipe, index: number) => {
      return recipe.id === id;
    });
  }

  getRecipes() {
    return this.httpClient.get('pep-api/recipe')
    .pipe(
      map((response: Response) => {
        this.recipes = <Recipe[]>response.body;
        return this.recipes.slice();
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    );
  }

  addRecipe(recipe: Recipe) {
    recipe.id = new Date().getMilliseconds();

    this.httpClient.post('pep-api/recipe', recipe)
    .pipe(
      map((response: Response) => {
        return <Recipe>response.body;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    ).subscribe((reci: Recipe) => {
      this.updateModel();
    });
  }

  updateRecipe(id: number, recipeUpdated: Recipe) {
    const recipe = this.recipes.find((r: Recipe) => {
      return r.id === id;
    });
    recipe.name = recipeUpdated.name;
    recipe.description = recipeUpdated.description;
    recipe.imagePath = recipeUpdated.imagePath;
    recipe.ingredients = recipeUpdated.ingredients;

    this.httpClient.put('pep-api/recipe/' + recipe.id, recipe)
    .pipe(
      map((response: Response) => {
        return <Recipe>response.body;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    ).subscribe((reci: Recipe) => {
      this.updateModel();
    });
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addIngredient(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  deleteRecipe(recipe: Recipe) {
    return this.httpClient.delete('pep-api/recipe/' + recipe.id)
    .pipe(
      map((response: Response) => {
        return response.body;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    ).subscribe((response: any) => {
      this.updateModel();
    });
  }

  private updateModel() {
    this.getRecipes().subscribe(() => {
      this.recipesChanged.next(this.recipes);
    });
  }
}
