import CartModel from "../../models/data_base/cart.model.js";
import mongoose from 'mongoose';

export class CartManager {

    async addCart() {
        try {
            let cart = new CartModel({ products: [] });
            await cart.save();
            console.log("Cart added successfully.");
            return cart;
        } catch (error) {
            console.error("Error adding cart:", error.message);
            return null;
        }
    }

    async getCartById(id) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                console.log("Invalid cart ID.");
                return null;
            }
            const cart = await CartModel.findById(id);
            if (!cart) {
                console.log("Cart not found.");
                return null;
            }
            return cart;
        } catch (error) {
            console.log("Error retrieving a cart by ID", error);
            throw error;
        }
    }

    async addProductToCart(cid, pid, quantity = 1) {
        try {
            if (!mongoose.isValidObjectId(cid)) {
                throw new Error("Invalid cart ID.");
            }
            if (!mongoose.isValidObjectId(pid)) {
                throw new Error("Invalid product ID.");
            }
            let cart = await this.getCartById(cid);
            if (!cart) {
                throw new Error("Cart not found.");
            }
            let productExist = cart.products.find(item => item.product.toString() === pid.toString());
            if (productExist) {
                productExist.quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
}