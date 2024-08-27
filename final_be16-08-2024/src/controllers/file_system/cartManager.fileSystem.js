import { Cart } from "../../models/file_system/newCart.js";
import { FileManager } from "../../utils/file_system/fileManager.js";

export class CartManager {
    constructor() {
        this.carts = [];
        this.fileManager = new FileManager("./src/data/carts.json");
        this.init();
    }

    async init() {
        this.carts = await this.fileManager.readRecords();
    }

    async addCart() {
        try {
            let cart = new Cart();
            this.carts.push(cart);
            await this.fileManager.saveRecords(this.carts);
            console.log("Cart added successfully.");
            return cart;
        } catch (error) {
            console.error("Error adding cart:", error.message);
            return null;
        }
    }

    getCartById(id) {
        let cartToSearch = this.carts.find(cart => cart.id === id);
        if (cartToSearch) {
            return cartToSearch;
        } else {
            return null;
        }
    }

    async addProductToCart(cid, pid, quantity = 1) {
        try {
            let cart = this.getCartById(cid);
            let productExist = cart.products.find(p => p.product === pid);

            if (productExist) {
                productExist.quantity += quantity;
            } else {
                cart.products.push({product: pid, quantity});
            }
            await this.fileManager.saveRecords(this.carts);
            return cart;
        } catch (error) {
            console.error("Error adding product to cart:", error.message);
            return null;
        }

    }
}