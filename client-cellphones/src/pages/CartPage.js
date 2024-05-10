import React from 'react';
import Cart from '../components/ShoppingCart/Cart'
import Header from 'components/header/Header';

function CartPage(props) {
    return (
        <div>
            <Header></Header>
            <p style={{height: '50px'}}></p>
            <Cart></Cart>
            <p style={{height: '100px'}}></p>
        </div>
    );
}

export default CartPage;