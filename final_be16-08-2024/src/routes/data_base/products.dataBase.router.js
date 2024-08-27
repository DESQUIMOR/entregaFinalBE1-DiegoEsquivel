import { Router } from "express";
import { ProductManager } from "../../controllers/data_base/productManager.dataBase.js";
const router = Router();

const manager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const productsList = await manager.getProducts();
        if (limit) {
            res.json(productsList.slice(0, limit));
        } else {
            res.json(productsList);
        }
    } catch (error) {
        console.error("Error fetching product list:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await manager.getProductById(id);
        if(!product) {
            res.send("Product not found"); 
        } else {
            res.json(product); 
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/", async (req, res)=>{
    const newProduct = req.body;
    try {
        await manager.addProduct(newProduct);
        res.json(newProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Internal Server Error");
    }
})

router.put("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await manager.getProductById(id);
        if(!product) {
            res.send("Product not found"); 
        } else {
            let productToUpdate = req.body
            const updated = await manager.updateProduct(id, productToUpdate);
            res.json(updated); 
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:pid", async (req, res)=>{
    let id = req.params.pid;
    try {
        const product = await manager.getProductById(id);
        if(!product) {
            res.send("Product not found"); 
        } else {
            await manager.deleteProduct(id);
            res.json(product); 
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal Server Error");
    }
})

export default router; 