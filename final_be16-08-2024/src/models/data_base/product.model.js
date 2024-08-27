import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productScheme = new mongoose.Schema({
        title: {
                type: String,
                required: true
        },
        description: {
                type: String,
                required: true
        },
        price: {
                type: Number,
                required: true
        },
        img: {
                type: String
        },
        code: {
                type: String,
                required: true,
                unique: true
        },
        stock: {
                type: Number,
                required: true
        }
})

productScheme.plugin(mongoosePaginate);

const ProductsModel = mongoose.model("products", productScheme)

export default ProductsModel;