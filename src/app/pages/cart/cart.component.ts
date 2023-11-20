import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.models';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Cart = {items: [
    { product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 3,
      id: 1
    },
    { product: 'https://via.placeholder.com/150',
    name:'snickers',
    price: 150,
    quantity: 2,
    id: 1
  }
    
  ]};
  
  dataSource: Array<CartItem>=[];
  displayedColumuns: Array<string>=[
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor(private cartService: CartService,private router: Router){}

  ngOnInit(): void{
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource=this.cart.items;
    })
  
  }
  redirectToNotFound() {
    this.router.navigate(['/ruta-inexistenta']);
  }
  getTotal(items: Array<CartItem>):number{
    return this.cartService.getTotal(items);
  }
  onClearCart(): void{
    this.cartService.clearCart();
  }
  onRemoveFromCart(item: CartItem): void{
    this.cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItem): void{
    this.cartService.addToCart(item);

  }
  onRemoveQuantity(item: CartItem): void{
    this.cartService.removeQuantity(item);
  }

}
