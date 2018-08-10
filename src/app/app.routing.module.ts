import { SignupComponent } from './auth/signup/signup.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { StartRecipeComponent } from './recipes/start-recipe/start-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';

const appRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes/*, {useHash: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
