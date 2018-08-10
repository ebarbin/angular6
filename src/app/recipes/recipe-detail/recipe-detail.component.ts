import { RecipesService } from '../recipes.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(+params['id']);
    });
  }

  onAddIngredientsToShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }

  onRecipeIngredientSelected(ingredient: Ingredient) {
    this.recipeService.addIngredient(ingredient);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe);
    this.router.navigate(['recipes']);
  }
}
