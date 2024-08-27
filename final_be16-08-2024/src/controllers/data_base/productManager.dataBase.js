import ProductModel from "../../models/data_base/product.model.js";
import mongoose from 'mongoose';

export class ProductManager {

    async addProduct({title, description, price, img, code, stock}) {
        try {
            if(!title|| !description || !price || !img || !code || !stock ) {
                console.log("Please fill out all fields. All fields are mandatory.");
                return; 
            }
            const productExist = await ProductModel.findOne({code: code});
            if(productExist) {
                console.log("The code must be unique.");
                return;
            }
            let product = new ProductModel({title, description, price, img, code, stock});
            await product.save();
            console.log("Product added successfully.");
        } catch (error) {
            console.log("Error adding product:", error); 
            throw error; 
        }
    }

    async getProducts() {
        try {
            const products = await ProductModel.find(); 
            return products;
        } catch (error) {
            console.log("Error retrieving products", error); 
            throw error; 
        }
    }

    async getProductById(id) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                console.log("Invalid product ID.");
                return null; 
            }
            const product = await ProductModel.findById(id);
            if(!product) {
                console.log("Product not found.");
                return null; 
            }
            return product;
        } catch (error) {
            console.log("Error retrieving products by ID", error); 
            throw error; 
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                console.log("Invalid product ID.");
                return null; 
            }
            const productToUpdate =  await ProductModel.findByIdAndUpdate(id, updatedProduct);
            if(!productToUpdate) {
                console.log("Product not found.");
                return null; 
            }
            console.log(`Product with id ${id} updated successfully.`);
            return productToUpdate;
        } catch (error) {
            console.log("Error updating product:", error); 
            throw error; 
        }
    }

    async deleteProduct(id) {
        if (!mongoose.isValidObjectId(id)) {
            console.log("Invalid product ID.");
            return null; 
        }
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(id);
            if(!deletedProduct) {
                console.log("Product not found.");
                return null; 
            }
            console.log(`Product with id ${id} deleted successfully.`);

        } catch (error) {
            console.log("Error deleting product:", error); 
            throw error; 
        }
    }
}