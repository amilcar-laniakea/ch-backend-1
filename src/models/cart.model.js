const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const cartSchema = new Schema({
  status: {
    type: Boolean,
    required: true,
    default: true, 
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
}, { timestamps: true });

cartSchema.plugin(mongoosePaginate);

const cartModel = "Cart";
const cartCollection = "carts";

const Cart = model(cartModel, cartSchema, cartCollection);

module.exports = Cart;

