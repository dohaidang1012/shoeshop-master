import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCurrentPage,
  paginationProduct,
} from "../../../../actions/ProductAction";
import Product from "./Product";
import { Pagination } from "antd";
import { getAllTypeProduct, paginationCategory } from "actions/ListTypeProductAction";
import Category from "./Category";

function ListCategory(props) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);
  const { typeProduct, List } = useSelector((state) => state.allTypeProduct);
  const HandleChangePage = async (number) => {
    dispatch(paginationCategory(number))
    dispatch(editCurrentPage(number));
  };
  useEffect(() => {
    dispatch(getAllTypeProduct())
    dispatch(paginationCategory(1))
  }, [])
  
  return (
    <div className="admin-product-list">
      <table>
        <tr>
          <th>STT</th>
          <th>Image</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        {typeProduct?.categories
          ? typeProduct?.categories?.map((item, index) => (
            <Category 
              category={item}
              key={item._id}
              update={item._id}
              number={index}
            />
            ))
          : ""}
      </table>
      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          pageSize={4}
          total={List.length}
          onChange={HandleChangePage}
        />
      </div>
    </div>
  );
}

export default ListCategory;
