import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationProduct,
} from "../../../../actions/ProductAction";
import { Link } from "react-router-dom";
import ListProduct from "./ListProduct";
import "./AdminProduct.css";
import { AppstoreAddOutlined, ToolOutlined } from "@ant-design/icons";
import ListCategory from "./ListCategory";

function AdminCategory(props) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);
  const { products } = useSelector((state) => state.allProduct.product);

  useEffect(() => {
    dispatch(paginationProduct(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="admin-product">
      <div className="admin-product-link">
        <Link to="/admin/category/create" className="add-product">
          <AppstoreAddOutlined />
        </Link>
      </div>

      {products ? (
        <ListCategory ></ListCategory>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default AdminCategory;
