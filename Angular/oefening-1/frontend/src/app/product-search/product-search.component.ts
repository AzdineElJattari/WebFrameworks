import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Product } from '../service/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent {
  products: Product[] = [];
  productSearchForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private ps: ProductService, private fb: FormBuilder) {}

  onSubmit() {
    this.ps.searchProduct(this.productSearchForm.value.name).subscribe(
      (data) => {
        this.products = data;//DATA VALUE MOET EEN ARRAY ZIJN ANDERS KRIJG JE PROBLEMEN MET NGFOR IN HTML
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
