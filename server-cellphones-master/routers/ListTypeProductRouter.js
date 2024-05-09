import express from "express";
import {
  createNewTypeProduct,
  deleteTypeProduct,
  getAllTypeProduct,
  getAllTypeProductByPage,
  getTypeProductById,
  updateNewTypeProduct,
} from "../controllers/ListTypeProductController.js";
import  {upload}  from "../untils/until.js";

const ListTypeProductRouter = express.Router();

ListTypeProductRouter.get("/", getAllTypeProduct);
ListTypeProductRouter.post(
  "/create",
  upload.single("image"),
  createNewTypeProduct
);

ListTypeProductRouter.get("/pagination/:page", getAllTypeProductByPage);

ListTypeProductRouter.delete(
  "/delete/:id",
  deleteTypeProduct
);

ListTypeProductRouter.put(
  "/update",
  upload.single("image"),
  updateNewTypeProduct
);

ListTypeProductRouter.get(
  "/:id",
  getTypeProductById
);

export default ListTypeProductRouter;
