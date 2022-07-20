import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
      recipesChannged = new Subject<Recipe[]>();
      private recipes: Recipe[] = [
        new Recipe('Burger', 'Grab it and have it', 
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/375px-Hamburger_%28black_bg%29.jpg', [
            new Ingredient('Meat', 1),
            new Ingredient('Buns', 2)
        ]),
        new Recipe('Tasty Meat and Fries', 'Great taste', 
        'https://previews.123rf.com/images/nitr/nitr1205/nitr120500014/13654235-grilled-steak-with-french-fries.jpg', [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ])
      ];
     // private recipes: Recipe[]= [];
      constructor(private slService: ShoppingListService){}
      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChannged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }
      getRecipe(index:number){
          return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChannged.next(this.recipes.slice());
      }
      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChannged.next(this.recipes.slice());
      }
      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChannged.next(this.recipes.slice());
      }
}