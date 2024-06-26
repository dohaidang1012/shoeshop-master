import React from 'react';
import {formatPrice} from '../../untils'
import { Link, useLocation } from "react-router-dom";


function Product(props) {
    const { product } = props;
    function AddToCart(product) {
        // const action = AddProduct(product);
        // dispatch(action);
    }

    return (
        <div className="hotsale-listproduct-product">
            <Link to={"detail/" + product._id}>
                <img src={product.image}></img>
                <p className="hotsale-listproduct-product-name">{product.name}</p>
                <div className="price">
                    <span className="price1">{formatPrice(product.salePrice)}đ</span>
                    <span className="price2">{formatPrice(product.price)}đ</span>
                </div>
            </Link>
            <div className="discount">
                <p>{product.percentDiscount}%</p>
            </div>
            <div className="buy">
                <Link href="/cart" onClick={() => AddToCart(product)}> Mua Ngay</Link>
            </div>
        </div>
    );
}

export default Product;