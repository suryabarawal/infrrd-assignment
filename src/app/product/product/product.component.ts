import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products = [];
  count: any = 0;
  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.createProducts();
    this.getCOunt();
  }

  createProducts() {
    this.cartService.createProduct().subscribe(res => {
      this.cartService.data = res;
      this.products = res;
    });
  }

  getCOunt() {
    this.cartService.cartItemCount.subscribe(res => {
      this.count = res;
    });
  }
}
