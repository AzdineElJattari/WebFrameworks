import { HttpParams } from '@angular/common/http';

export class Product {
  constructor(
    public name: string,
    public price: number,
    public rating: number
  ) {}

  getParams(): HttpParams {
    return new HttpParams()
      .set('name', this.name)
      .set('price', this.price)
      .set('rating', this.rating);
  }
}
