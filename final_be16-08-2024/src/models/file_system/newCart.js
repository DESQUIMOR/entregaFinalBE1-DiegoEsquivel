export class Cart {
    static actualId = 0;

    constructor() {
        this.id = ++Cart.actualId;
        this.products = [];
    }
}