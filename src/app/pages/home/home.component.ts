import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { forkJoin } from 'rxjs';

const ROWS_HEIGHT: {[id:number]:number} = {1:400, 3:335, 4:350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products: { data: any[] } = { data: [] };
  users:User[]=[];
  cols= 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category:string | undefined;
  sort:string = 'desc';
  count:string = '12';
  selectedCategory: string | null = null;
  categories:any;

  constructor(private cartService: CartService, private apiService:ApiService, private productService: ProductsService){}

  ngOnInit(): void {
    this.apiService.readUsers().subscribe((users:User[]) => {
      console.log(users['users']);
      this.users = users['users']
    });

    this.loadInitialData();
  }

  //category
  private loadInitialData(): void {
    forkJoin({
      categories: this.productService.getAllCategories(),
      initialProducts: this.productService.getProducts()
    }).subscribe((response: { categories: string[], initialProducts: any }) => {
      this.categories = response.categories;
      this.selectedCategory = this.categories[0]; 
      console.log('Categories:', this.categories);
  
      this.products = response.initialProducts;
      console.log('Initial Products:', this.products);
    });
  }

  onColumnsCountChange(colsNum:number):void{
    this.cols=colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }


  onShowCategory(category: any): void {
    console.log('onShowCategory called with category:', category);
  
    if (category && category.length > 0) {
      // Verifică dacă categoria există și are elemente
      this.products = { data: category };
      console.log('Products:', this.products);
    } else {
      console.warn('No products for the selected category');
    }
  }

 

  onAddToCart(product:Product): void{
    this.cartService.addToCart({
       product: product.poza_url,
      name: product.nume_produs,
      price: product.pret_produs,
      quantity: 1,
      id: product.id
      
    })
  }

}
