import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Response } from '../shared/response.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<Ingredient>();

  constructor(private httpClient: HttpClient) { }

  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.httpClient.get('pep-api/ingredient')
    .pipe(
      map((response: Response) => {
        this.ingredients = <Ingredient[]>response.body;
        return this.ingredients.slice();
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    );
  }

  getIngredient(id: number) {
    return this.ingredients.slice().find((ingredient: Ingredient, index: number) => {
      return ingredient.id === id;
    });
  }

  addIngredient(ingredient: Ingredient) {
    this.httpClient.post('pep-api/ingredient', ingredient)
    .pipe(
      map((response: Response) => {
        return <Ingredient>response.body;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    ).subscribe(() => {
      this.getIngredients().subscribe(() => {
        this.updateModel();
      });
    });
  }

  addIngredients(ingredients: Ingredient[]) {
    this.httpClient.post('pep-api/ingredient/multi', ingredients)
    .pipe(
      map((response: Response) => {
        return <Ingredient>response.body;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    ).subscribe(() => {
      this.getIngredients().subscribe(() => {
        this.updateModel();
      });
    });
  }

  updateIngredient(ingredient: Ingredient) {
    this.httpClient.put('pep-api/ingredient/' + ingredient.id, ingredient)
    .pipe(
      map((response: Response) => {
        return <Ingredient>response.body;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    ).subscribe((ingre: Ingredient) => {
      this.getIngredients().subscribe(() => {
        this.updateModel();
      });
    });
  }

  deleteIngredient(ingredient: Ingredient) {
    this.httpClient.delete('pep-api/ingredient/' + ingredient.id)
    .pipe(
      map((response: Response) => {
        return <Ingredient>response.body;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    ).subscribe(() => {
      this.getIngredients().subscribe(() => {
        this.updateModel();
      });
    });
  }

  private updateModel() {
    this.getIngredients().subscribe(() => {
      this.ingredientsChanged.next(this.ingredients);
    });
  }
}
