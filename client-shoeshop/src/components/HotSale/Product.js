import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../actions/CartAction";
import { Link } from "react-router-dom";
import { formatPrice } from "../../untils/index";
import { Radio, message } from "antd";

function Product(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const [sizeSelected, setSizeSelected] = useState("");
  const [colorSelected, setColorSelected] = useState("");
  const success = () => {
    message.success({
      content: "Thêm vào giỏ hàng thành công",
      duration: 1,
      className: "custom-class",
      style: {
        position: "absolute",
        right: "2rem",
        top: "2rem",
        margin: "1rem 0",
      },
    });
  };

  const AddProductToCart = async (product) => {
    if (sizeSelected !== "" && colorSelected !== "") {
      const action = AddToCart({ ...product, sizeSelected, colorSelected });
      dispatch(action);
      success();
    } else {
      alert("Hãy chọn màu và size!");
    }
  };

  const onChangeSize = (e) => {
    setSizeSelected(e.target.value);
  };
  const onChangeColor = (e) => {
    setColorSelected(e.target.value);
  };
  return (
    <div className="hotsale-listproduct-product">
      <Link to={"/detail/" + product._id}>
        <img src={product.image}></img>
        <p className="hotsale-listproduct-product-name">{product.name}</p>
        <div className="price">
          <span className="price1">{formatPrice(product.salePrice)}đ</span>
          <span className="price2">{formatPrice(product.price)}đ</span>
        </div>
      </Link>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          margin: "10px 0",
        }}
      >
        <div className="size" style={{ textAlign: "left" }}>
          Size
          <Radio.Group size="small" onChange={onChangeSize}>
            {product?.sizes.map((item, index) => (
              <Radio.Button key={index} value={item}>
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className="color" style={{ textAlign: "left" }}>
          Color
          <Radio.Group size="small" onChange={onChangeColor} defaultValue="a">
            {product?.colors.map((item, index) => (
              <Radio.Button key={index} value={item}>
                {item.toUpperCase()}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      </div>
      {product.percentDiscount >= 5 ? (
        <div className="discount">
          <p>{product.percentDiscount}%</p>
        </div>
      ) : (
        ""
      )}
      <div className="buy">
        <p onClick={() => AddProductToCart(product)}> Mua Nhanh</p>
      </div>
    </div>
  );
}

export default Product;
