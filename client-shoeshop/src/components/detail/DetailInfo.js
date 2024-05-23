import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {AddToCart} from '../../actions/CartAction'
import {Link} from 'react-router-dom'
import {formatPrice} from '../../untils/index'
import { Radio } from 'antd';
import { useHistory } from "react-router-dom"
function DetailInfo(props) {
    const dispatch = useDispatch()
    const [sizeSelected, setSizeSelected] = useState('')
    const [colorSelected, setColorSelected] = useState('')
    const { product } = props;
    let history = useHistory()	
    function handleAddProduct(product) {
        if(sizeSelected !== '' && colorSelected !== '') {
            const action = AddToCart({...product, sizeSelected, colorSelected})
            dispatch(action)
            history.push("/cart")
        } else {
            alert('Hãy chọn màu và size!')
        }
    }
    const onChangeSize = (e) => {
        setSizeSelected(e.target.value)
    };
    const onChangeColor = (e) => {
        setColorSelected(e.target.value)
    };
    return (
        <div className="detail-info-right">
            <div className="detail-info-right-price">
                <p className="price-box">
                    <span className="saleprice">{formatPrice(product.salePrice)}đ</span>
                    <span className="old-price">Giá niêm yết : <strong className="price">{formatPrice(product.price)}đ</strong> </span>
                </p>
                <p className="detail-info-sale">
                    Sản phẩm thuộc chương trình HOT SALE CUỐI TUẦN - Nhanh tay thanh toán!
                            </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 16, margin: '10px 0'}}>
                <div style={{textAlign: 'left'}}>
                    <span>Kích cỡ: </span>
                    <Radio.Group size='large' onChange={onChangeSize}>
                        {
                            product?.sizes.map((item, index) => (
                                <Radio.Button key={index} value={item}>{item}</Radio.Button>
                            ))
                        }
                    </Radio.Group>
                </div>
                <div style={{textAlign: 'left'}}>
                    <span>Màu sắc:   </span>
                    <Radio.Group size='large' onChange={onChangeColor} defaultValue="a">
                        {
                            product?.colors.map((item, index) => (
                                <Radio.Button key={index} value={item}>{item.toUpperCase()}</Radio.Button>
                            ))
                        }
                    </Radio.Group>
                </div>
            </div>
            <div className="detail-info-right-buy">
                <div className="detail-info-right-buy-now">
                    <div onClick={() => handleAddProduct(product)}>
                        <strong>MUA NGAY</strong>
                        <br></br>
                        <span>(Giao tận nơi hoặc lấy tại cửa hàng)</span>
                    </div>
                </div>
                <div className="detail-info-right-buy-installment">
                    <a href="">
                        <strong>TRẢ GÓP 0%</strong>
                        <br></br>
                        <span>(Xét duyệt qua điện thoại)</span>
                    </a>
                    <a href="">
                        <strong>TRẢ GÓP QUA THẺ</strong>
                        <br></br>
                        <span>(Visa, Master, JCB)</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default DetailInfo;