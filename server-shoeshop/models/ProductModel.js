import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewProduct = new Schema(
  {
    name: { type: String },
    comment: { type: String },
    star: { type: Number },
  },
  {
    timestamps: true,
  }
);

const replieCommentProduct = new Schema({
  content: { type: String },
  isAdmin: Boolean,
  nameUser: { type: String },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const commentProduct = new Schema({
  author: { type: String },
  status: String,
  isAdmin: Boolean,
  avatar: { type: String },
  content: { type: String },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  replies: [replieCommentProduct],
});

const Product = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    type: { type: String, required: true },
    image: { type: String },
    amount: {type: Number, default: 100},
    cloudinary_id: { type: String },
    rating: { type: Number },
    numReviews: { type: Number },
    blog: String,

    reviews: [reviewProduct],
    comments: [commentProduct],
    brand: { type: String },

    colors: [{ type: String }],
    sizes: [{ type: Number }],

  },
  {
    timestamps: true,
  }
);
Product.index({ name: "text" });

export const ProductModel = mongoose.model("Product", Product);
