import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] = [];
  selectedCategory: string | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    console.log('ngOnInit of FiltersComponent');
    this.categoriesSubscription = this.productService.getAllCategories()
      .subscribe((categories: string[]) => {
        this.categories = categories;
        console.log('Categories:', this.categories);
      });
  }

  onShowCategory(): void {
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(
        products => {
          this.showCategory.emit(products);
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      console.warn('No category selected');
    }
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
