export class Cart {

    products: Product[] = [];
    totalPrice: number = 0;

}

export class Product {
    _id        :   any;
    name      :   string;
    price     :   number;
    createdAt   :   string;
    //updatedAt   :   string;
    sellerName:   string;
}