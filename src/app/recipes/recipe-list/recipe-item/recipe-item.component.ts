import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  onRecipeSelected() {
    console.log('clickeo!');
    this.recipeSelected.emit(this.recipe);
  }

  constructor() { }

  ngOnInit() {
  }

}
