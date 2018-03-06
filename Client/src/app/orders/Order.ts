import {Product} from '../product';
export class Order {
  products: Product[];
  shippingAddress: string;
  purchaseDate: Date;
  totalPrice: Number;
}
