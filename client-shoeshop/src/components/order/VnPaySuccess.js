import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

export default function VnPaySuccess() {
  const location = useLocation();
  const [code, setCode] = useState(null)
  useEffect(() => {
    const getResultVNPay = async () => {
      const query = location.search;
      if(query == '') {
        setCode('00')
      } else {
        const { data } = await axios.get(`http://localhost:4000/payment/vnpay_return${query}`);
        setCode(data.code)
      }
    };

    getResultVNPay();
  }, []);
  return (
    <section id="order-success">
      <div className={`order-success ${code == '00' ? 'order-success' : 'order-fail' }`}>
        {
          code == '00' ? 
          <span><CheckOutlined></CheckOutlined></span> : <CloseOutlined />
        }
        <p>Đặt hàng {code == '00' ? 'thành công' : 'thất bại'}</p>
        {/* <Link to="">OK</Link> */}
        <div className="links">
          <Link to="/myOrder">Xem lại đơn hàng</Link>
          <Link to="/">Trang chủ</Link>
        </div>

      </div>
    </section>
  );
}
