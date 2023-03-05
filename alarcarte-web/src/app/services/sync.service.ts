import { Injectable } from '@angular/core';

import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { FoodService } from './food.service';
import { Food } from '../models/Food';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/Cart';
import { CartItem } from '../models/Cartitem';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  ydoc = new Y.Doc();
  ymap = this.ydoc.getMap("cart");
  provider = new WebrtcProvider('group', this.ydoc, { signaling: ['ws://localhost:4444'] });
  dbprovider = new IndexeddbPersistence('cart-data', this.ydoc);

  foods: Food[] = []

  cartMap: any = []

  private cart: Cart = new Cart();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);


  constructor(private foodService: FoodService) {
    // console.log(this.ydoc, this.ymap);

    this.initialise()
  }

  initialise() {
    this.foods = this.foodService.getAll()
    console.log(this.ymap);

    this.updateCartMap()
    this.foods.forEach((food: Food) => {
      // this.ymap.set(food.id, 0)
    })

    this.ydoc.on("update", (update, origin) => {
      console.log(update);
      // Y.applyUpdate(ydoc, update)
      // console.log(ymap.toJSON());

      this.updateCartMap()
      // this.ymap.forEach((value, item, map) => {
      //   console.log(item, value);
      //   // $("#" + item).val(value);
      // })
    })

  }

  updateYmap(foodId: string, quantity: Number) {
    this.ymap.set(foodId, quantity)
  }

  updateCartMap() {
    let cart = this.prepareCartMap()
    this.cart = cart

    this.cartSubject.next(cart);
  }

  prepareCartMap(): Cart {

    let cart: Cart = {
      items: [],
      totalCount: 0,
      totalPrice: 0
    }

    this.ymap.forEach((value: any, item, map) => {
      console.log(item, value);
      if (value > 0) {
        let food = this.foods.filter(food => food.id == item)[0]
        console.log(food);
        
        if(!food || !food.id){
          return
        }
        let cartItem: CartItem = new CartItem(food)
        console.log(cartItem);
        
        cartItem.price = food.price * value
        cartItem.quantity = value
        cart.items.push(cartItem)

        cart.totalCount += cartItem.quantity >= 0 ? cartItem.quantity : 0
        cart.totalPrice += cartItem.price >= 0 ? cartItem.price : 0
      }
    })

    return cart

  }

  getCart() {
    return this.cart
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addToCart(food: Food): void {
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.updateYmap(food.id, 1)

    // this.cart.items.push(new CartItem(food));

  }


  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);
      this.updateYmap(foodId, 0)
  }
}
