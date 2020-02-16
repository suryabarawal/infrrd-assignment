import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/product";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CartService {
  data: Product[] = [];
  private cart: any = [];
  public cartItemCount = new BehaviorSubject(0);
  dataUrl = "../../assets/items.json";
  constructor(private http: HttpClient) {}

  createProduct(): Observable<any> {
    return this.http.get(this.dataUrl);
  }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    const existingProduct = this.cart && this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.amount += 1;
    } else {
      product.amount += 1;
      this.cart.push(product);
    }
    this.cartItemCountCreate();
  }

  getSingleProductCountInCart(product) {
    const existingProduct = this.cart && this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      return existingProduct.amount;
    } else {
      return;
    }
  }

  cartItemCountCreate() {
    let count = 0;
    this.cart.forEach(res => {
      count = count + res.amount;
    });
    this.cartItemCount.next(count);
  }

  decreaseProduct(product) {
    const existingProduct = this.cart && this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      if (existingProduct.amount === 1) {
        const index = this.cart && this.cart.findIndex(id => id.id === product.id);
        if (index !== -1) {
          this.cart.splice(index, 1);
        }
      }
      existingProduct.amount -= 1;
      this.cartItemCountCreate();
    }
  }

  removeProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cart.splice(index, 1);
        this.cartItemCountCreate();
      }
    }
  }

  getProductDetails(productId) {
    const pIdx = this.data.findIndex(p => p.id === Number(productId));
    if (pIdx !== -1) {
      return this.data[pIdx];
    }
  }
}
