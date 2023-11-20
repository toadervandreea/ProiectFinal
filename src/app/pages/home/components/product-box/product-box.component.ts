import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})

export class ProductBoxComponent implements OnChanges {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();
  public productImage: string | undefined;

  ngOnChanges(): void {
    if (this.product && this.product.poza_url) {
      if (typeof this.product.poza_url === 'string') {
        this.productImage = this.product.poza_url;
      } else if (
        this.product.poza_url &&
        typeof this.product.poza_url === 'object' &&
        'type' in this.product.poza_url &&
        'data' in this.product.poza_url
      ) {
        // Perform runtime checks to ensure the expected properties exist
        const bufferData = this.product.poza_url as any; 
        if (bufferData.data && Array.isArray(bufferData.data)) {
          // Correct base64 encoding
          const base64Image = btoa(String.fromCharCode.apply(null, bufferData.data));
          this.productImage = `data:image/jpeg;base64,${base64Image}`;
        } else {
          console.error('Invalid poza_url:', this.product.poza_url);
          // Set a default image or handle the error as needed
        }
      } else {
        console.error('Invalid poza_url:', this.product.poza_url);
        // Set a default image or handle the error as needed
      }
    } else {
      console.error('Invalid product:', this.product);
      // Set a default image or handle the error as needed
    }
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}



