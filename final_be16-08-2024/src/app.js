import express from "express";
import productsRouterFS from "./routes/file_system/products.fileSystem.router.js";
import cartsRouterFS from "./routes/file_system/carts.fileSystem.router.js";
import viewsRouterFS from "./routes/file_system/views.fileSystem.router.js"
import productsRouterDB from "./routes/data_base/products.dataBase.router.js";
import cartsRouterDB from "./routes/data_base/carts.dataBase.router.js";
import viewsRouterDB from "./routes/data_base/views.dataBase.router.js"
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose"
import { ProductManager } from "./controllers/file_system/productManager.fileSystem.js";

const manager = new ProductManager();

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouterFS);
app.use("/api/carts", cartsRouterFS);
app.use("/", viewsRouterFS);
app.use("/database", viewsRouterDB);
app.use("/database/products", productsRouterDB)
app.use("/database/carts", cartsRouterDB)

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("A client has connected");

    socket.emit("products", await manager.getProducts());
    socket.on("deleteProduct", async (id) => {
        await manager.deleteProduct(id);
        socket.emit("products", await manager.getProducts());
    })

    socket.on("addProduct", async ({ title, description, price, thumbnail, code, stock }) => {
        await manager.addProduct(title, description, price, thumbnail, code, stock);
        socket.emit("products", await manager.getProducts());
    })
})
//----------------------------------------------------Conectar con base de datos---------------------------------------------
mongoose.connect("mongodb+srv://admin:1234@cluster0.6qvjt.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Successfully connected to the database."))
    .catch((error)=> console.log("Connection error: ", error))
//-----------------------------------------------------------------------------------------------------------------------------