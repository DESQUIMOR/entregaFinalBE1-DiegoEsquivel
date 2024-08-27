import { Router } from "express";
import ProductsModel from "../../models/data_base/product.model.js";
const router = Router();
//const manager = new ProductManager();

router.get("/", async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 1;
    try {
        const productList = await ProductsModel.paginate({},{limit, page});
        const productsToShow = productList.docs.map( product => {
            const { _id, ...rest} = product.toObject();
            return rest;
        })
        
        res.render("products", {
            products: productsToShow,
            hasPrevPage: productList.hasPrevPage,
            hasNextPage: productList.hasNextPage,
            prevPage: productList.prevPage,
            nextPage: productList.nextPage,
            currentPage: productList.page,
            totalPages: productList.totalPages,
            limit:limit
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
})

export default router;