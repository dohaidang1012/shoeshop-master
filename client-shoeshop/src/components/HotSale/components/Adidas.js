import React, { useEffect, useState } from "react";
import axios from "axios";
import ListProduct from "../ListProduct";

import { handlePercentDiscount } from "../../../untils/index";
import { useDispatch } from "react-redux";

function Adidas(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("adidas");
  const [hotAdidas, setHotAdidas] = useState([]);

  useEffect(() => {
    async function FetchApi() {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/products/${name}`
        );
        setHotAdidas(data);
      } catch (error) {}
    }
    FetchApi();
  }, []);

  return (
    <section id="hotsale">
      <div className="hotsale">
        <h2>{name}</h2>
        {hotAdidas ? (
          <ListProduct
            HotSaleProducts={handlePercentDiscount(hotAdidas)}
          ></ListProduct>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Adidas;
