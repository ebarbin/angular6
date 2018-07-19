import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {}

  onAddIngredient(form: NgForm) {
    console.log(form);
    const name: string = form.value.name;
    const amount: number = form.value.amount;
    this.shoppingListService.addIngredient(new Ingredient(name, amount));
  }
}
