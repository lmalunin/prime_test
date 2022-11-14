import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

interface ColumnTypes {
    checkBox: string;
    icon: string;
    buttonSelect: string;
}

@Component({
    selector: 'app-tablenew1',
    templateUrl: './tablenew1.component.html',
    styleUrls: ['./tablenew1.component.scss']
})
export class Tablenew1Component implements OnInit {

    public COLUMN_TYPES: ColumnTypes = {
        checkBox: '50px',
        icon: '50px',
        buttonSelect: '50px'
    };

    public products: Product[] = [];

    constructor(private _productService: ProductService) {
    }

    ngOnInit(): void {
        this._productService.getProductsSmall().then(data => this.products = data);
        console.log(this.COLUMN_TYPES.icon);
    }

}
