import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/Cartitem';
import { CartService } from 'src/app/services/cart.service';
import { SyncService } from 'src/app/services/sync.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: Cart;
  constructor(private cartService: CartService ,private syncService: SyncService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      // this.cart = cart;
    })

    this.syncService.getCartObservable().subscribe((cart) => {
      console.log('cart is ', cart);
      
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  
  //  console.log('cartis ',cartMap);
   
  }

  removeFromCart(cartItem: CartItem) {
    this.syncService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantity: number) {
    // const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(this.cart, cartItem.food.id, quantity);
  }

  decreaseQuantity(cartItem: CartItem){
    let q = cartItem.quantity -1
    if(q <=0 ) q=0;
    this.changeQuantity(cartItem, q)
  }

  increaseQuantity(cartItem: CartItem){
    let q = cartItem.quantity +1
    this.changeQuantity(cartItem, q)
  }
}
