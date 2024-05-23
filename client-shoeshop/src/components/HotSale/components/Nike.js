import React, { useEffect, useState } from "react";
import axios from "axios";
import ListProduct from "../ListProduct";
import { handlePercentDiscount } from "../../../untils/index";
import { useDispatch } from "react-redux";

function Nike(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("nike");
  const [hotNike, setHotNike] = useState([]);
  useEffect(() => {
    async function FetchApi() {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/products/${name}`
        );
        setHotNike(data);
      } catch (error) {}
    }
    FetchApi();
  }, []);

  return (
    <section id="hotsale nike">
      <div className="hotsale">
        <h2>{name}</h2>
        {hotNike ? (
          <ListProduct
            HotSaleProducts={handlePercentDiscount(hotNike)}
          ></ListProduct>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Nike;
