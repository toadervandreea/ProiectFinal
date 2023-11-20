import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent{
  @Output() columnsCountChange = new EventEmitter<number>();
  onColumnsUpdated(colsNum: number):void{
    this.columnsCountChange.emit(colsNum);
  }

}
