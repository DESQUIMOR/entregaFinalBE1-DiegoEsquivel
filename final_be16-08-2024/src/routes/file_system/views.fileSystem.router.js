import { Router } from "express";
import { ProductManager } from "../../controllers/file_system/productManager.fileSystem.js";
const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.render("home", {products:products});
    } catch (error) {
        res.status(500).json();
        res.status(500).send("Internal Server Error");
    }
})

router.get("/realtimeproducts",  (req, res) => {
    res.render("realtimeproducts");
})

export default router;