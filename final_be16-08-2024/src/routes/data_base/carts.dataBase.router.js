import { Router } from "express";
import { CartManager } from "../../controllers/data_base/cartManager.dataBase.js";
const router = Router();
const manager = new CartManager();

router.post("/", async (req, res)=>{
    try {
        const newCart = await manager.addCart();
        res.json(newCart);
    } catch (error) {
        console.error("Error adding cart:", error);
        res.status(500).send("Internal Server Error");
    }
})

router.get("/:cid", async (req, res) => {
    let id = req.params.cid;
    try {
        const cart = await manager.getCartById(id);
        if(!cart) {
            res.send("Cart not found"); 
        } else {
            res.json(cart.products); 
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let quantity = req.body.quantity || 1;
    try {
        const updatedCart = await manager.addProductToCart(cid, pid, quantity)
        res.json(updatedCart.products)
    } catch (error) {
        console.error("Error adding products to cart:", error.message);
        res.status(500).send("Internal Server Error:");
    }
})
export default router; 