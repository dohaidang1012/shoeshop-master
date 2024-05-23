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
  const handleAddToCart = async (product) => {
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
    <div className="hotsale-listproduct-product" title="Xem chi tiết">
      <a href={"/detail/" + product._id}>
        <img src={product.image}></img>
        <p className="hotsale-listproduct-product-name">{product.name}</p>
        <div className="price">
          <span className="price1">{formatPrice(product.salePrice)}đ</span>
          <span className="price2">{formatPrice(product.price)}đ</span>
        </div>
      </a>
      <div className="discount">
        <p>{product.percentDiscount}%</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          margin: "10px 0",
        }}
      >
        <div className="size">
          Size:
          <Radio.Group size="small" onChange={onChangeSize}>
            {product?.sizes.map((item, index) => (
              <Radio.Button key={index} value={item}>
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className="color">
          Color:
          <Radio.Group size="small" onChange={onChangeColor} defaultValue="a">
            {product?.colors.map((item, index) => (
              <Radio.Button key={index} value={item}>
                {item.toUpperCase()}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      </div>
      <div className="buy">
        <p onClick={() => handleAddToCart(product)}>Mua Nhanh</p>
      </div>
    </div>
  );
}

export default Product;
