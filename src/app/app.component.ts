import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'finalproject';
  cart: Cart = {items:[]}
  constructor(private cartService: CartService){}

  ngOnInit(){
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
  });
  }
}
