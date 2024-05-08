import React, { useEffect, useState } from "react";
import axios from "axios";
import ListProduct from "../ListProduct";

import { handlePercentDiscount } from "../../../untils/index";
import { useDispatch } from "react-redux";

function Converse(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("converse");
  const [hotConverse, setHotConverse] = useState([]);

  useEffect(() => {
    async function FetchApi() {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/products/${name}`
        );
        setHotConverse(data);
      } catch (error) {}
    }
    FetchApi();
  }, []);

  return (
    <section id="hotsale">
      <div className="hotsale">
        <h2>{name}</h2>
        {hotConverse ? (
          <ListProduct
            HotSaleProducts={handlePercentDiscount(hotConverse)}
          ></ListProduct>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Converse;
