import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { SignoutUser } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { searchProduct } from "../../actions/ProductAction";
import { Link } from "react-router-dom";
import { Dropdown, Space } from 'antd';
import {
  DownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);

  const [menu, setMenu] = useState(true);

  const handleSignout = () => {
    dispatch(SignoutUser());
  };

  const SearchProduct = async (e) => {
    e.preventDefault();
    await history.push("/search");
    dispatch(searchProduct(search));
    setSearch("");
  };
  const items = [
    {
      label: userInfo?.isAdmin ? <Link to="/admin" ><p className="menu-link" >Admin</p></Link> : "" ,
      key: '0',
    },
    {
      label:  <Link to="/myOrder" ><p className="menu-link">Đơn hàng </p></Link>,
      key: '1',
    },
    {
      label: <Link onClick={() => handleSignout()} ><p className="menu-link">Đăng xuất </p></Link>,
      key: '3',
    },
  ];
  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <span>
            <Link to="/"> SHOE STORE </Link>
          </span>
        </div>
        <ul className="menu-list" id={menu ? "hidden" : ""}>
          <li className="active">
            <Link to="/"> Trang Chủ </Link>
          </li>
          {/* <li className="active">
            <Link to="/product"> Men </Link>
          </li>
          <li className="active">
            <Link to="/product"> Women </Link>
          </li>
          <li className="active">
            <Link to="/product"> Kids </Link>
          </li> */}
          {/* <li className="active">
            <Link to="/product"> Sale </Link>
          </li> */}
          <li>
            <Link to="/product"> Sản Phẩm </Link>
          </li>
          <li className="active">
            <Link to="/about-us"> About us </Link>
          </li>
          <li className="active">
            <Link to="/contact"> Contact</Link>
          </li>
        </ul>
        <div className="header-right">
          <div className="search">
            <form onSubmit={(e) => SearchProduct(e)}>
              <input
                type="text"
                name="search"
                placeholder="Tìm kiếm ..."
                defaultValue={setSearch}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <SearchOutlined
                onClick={(e) => SearchProduct(e)}
              ></SearchOutlined>

              {/* <button type="submit" onClick={(e) => SearchProduct(e)}>Search</button> */}
            </form>
          </div>

          {userInfo ? (
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <Link onClick={(e) => e.preventDefault()} style={{color: 'black', padding: '4px 0'}}>
                <Space>
                {userInfo.name}
                  <DownOutlined />
                </Space>
              </Link>
            </Dropdown>
          ) : (
            <li onClick={() => setShowAccount(!showAccount)}>
              <Link>
                Tài khoản
                <DownOutlined style={{ fontSize: "14px" }} />
              </Link>

              {showAccount ? (
                <div className="menu-drop">
                  <Link to="register">Đăng kí</Link>
                  <Link to="login">Đăng nhập</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          )}
          <li className="shop-cart">
            <Link to="/cart" className="shop-cart">
              <ShoppingCartOutlined
                style={{ fontSize: "30px" }}
              ></ShoppingCartOutlined>
              <span className="count"> {amount} </span>
            </Link>
          </li>
        </div>
        <div className="bar" onClick={() => setMenu(!menu)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </section>
    </div>
  );
}

export default Header;
