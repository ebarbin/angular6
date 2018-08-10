import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { StartRecipeComponent } from './start-recipe/start-recipe.component';
import { RecipesComponent } from './recipes.component';


const appRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: StartRecipeComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id/edit', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
