import { RecipesService } from './recipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipeService.recipeSelected
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipe = recipe;
  }
}
