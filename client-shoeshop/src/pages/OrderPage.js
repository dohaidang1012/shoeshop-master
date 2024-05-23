import React from 'react';
import PropTypes from 'prop-types';
import Order from '../components/order/Order';
import { useSelector } from 'react-redux';
import Alert from '../components/Alert/Alert'
import Header from 'components/header/Header';
OrderPage.propTypes = {
    
};

function OrderPage(props) {
    return (
        <div>
            <Header></Header>
            <p style={{height: '200px'}}></p>
            <Order></Order>
        </div>
    );
}

export default OrderPage;