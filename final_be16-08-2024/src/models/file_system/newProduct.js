export class Product {
    static actualId = 0;

    constructor(title, description, price, thumbnail, code, stock) {
        this.id = ++Product.actualId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}