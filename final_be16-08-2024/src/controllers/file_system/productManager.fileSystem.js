import { Product } from "../../models/file_system/newProduct.js";
import { FileManager } from "../../utils/file_system/fileManager.js";

export class ProductManager {
    constructor() {
        this.products = [];
        this.fileManager = new FileManager("./src/data/products.json");
        this.init();
    }

    async init() {
        this.products = await this.fileManager.readRecords();
    }

    async addProduct(title, description, price, img, code, stock) {
        try {
            if (!title || !description || !price || !img || !code || !stock) {
                throw new Error("Please fill out all fields. All fields are mandatory.");
            }
            if (this.products.some(product => product.code === code)) {
                throw new Error("The code must be unique.");
            }
            let product = new Product(title, description, price, img, code, stock);
            this.products.push(product);
            await this.fileManager.saveRecords(this.products);
            console.log("Product added successfully.");
            return product;
        } catch (error) {
            console.error("Error adding product:", error.message);
            return null;
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let productToSearch = this.products.find(product => product.id === id);
        if (productToSearch) {
            return productToSearch;
        } else {
            return null;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            let index = this.products.findIndex(product => product.id === id);
            if (index === -1) {
                throw new Error("Product not found.");
            }
            this.products[index] = { ...this.products[index], ...updatedProduct };
            await this.fileManager.saveRecords(this.products);
            console.log(`Product with id ${id} updated successfully.`);
            return this.products[index];
        } catch (error) {
            console.error("Error updating product:", error.message);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            let index = this.products.findIndex(product => product.id === id);
            if (index === -1) {
                throw new Error("Product not found.");
            }
            const deletedProduct = this.products.splice(index, 1)[0];
            await this.fileManager.saveRecords(this.products);
            console.log(`Product with id ${id} deleted successfully.`);
            return deletedProduct;
        } catch (error) {
            console.error("Error deleting product:", error.message);
            return null;
        }
    }
}
