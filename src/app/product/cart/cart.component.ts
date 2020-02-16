import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any = [];
  totalAmount: any;

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.getAllCartItems();
  }

  getAllCartItems() {
    this.cart = this.cartService.getCart();
    // this.getTotalCartCalue();
  }

  getCountOfProductInCart(item) {
    return this.cartService.getSingleProductCountInCart(item);
  }

  // get Total cart amount
  getTotalCartCalue() {
    let total = 0;
    if(this.cart.length) {
      this.cart.filter( c => {
            const productPrice = c.price * c.amount;
            total += productPrice;
          }
        );
    }
    return this.totalAmount = total;
  }

  // Checkout Function
  checkout() {
    alert('Checkout successfully')
  }
}
