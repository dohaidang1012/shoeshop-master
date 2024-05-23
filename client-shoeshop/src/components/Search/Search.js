import React from "react";
import { useSelector } from "react-redux";
import { handlePercentDiscount } from "../../untils/index";
import "./Search.css";
import ListProduct from "./ListProduct";
function Search(props) {
  const searchProduct = useSelector((state) => state.searchProduct);
  const { products } = searchProduct;

  return (
    <section id="hotsale nike">
      <div className="hotsale">
        {products && products.length > 0 ? (
          <ListProduct
            HotSaleProducts={handlePercentDiscount(products)}
          ></ListProduct>
        ) : (
          <h2>ko tim thay sp</h2>
        )}
      </div>
    </section>
  );
}

export default Search;
