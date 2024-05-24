
export const getHtmlSendMail = (order) => {
    
const generateOrderItemsHTML = (items) => {
    return items.map(item => `
        <div class="order-item">
            <div>
                <h3>${item.name}</h3>
                <p>Size: ${item.size}</p>
                <p>Color: ${item.color}</p>
                <p>Quantity: ${item.qty}</p>
            </div>
            <div>
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div>
                <p>Price: ${item.salePrice} VND</p>
            </div>
        </div>
    `).join('');
};
const htmlSendMail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
        }
        .order-details, .shipping-details {
            margin-bottom: 20px;
        }
        .order-item {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }
        .order-item img {
            max-width: 100px;
        }
        .order-summary {
            text-align: right;
        }
        .order-summary h3 {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase, ${order.shippingAddress.name}!</p>
        </div>
        <div class="order-details">
            <h2>Order Details</h2>
            ${generateOrderItemsHTML(order.orderItems)}
        </div>
        <div class="shipping-details">
            <h2>Shipping Details</h2>
            <p><strong>Name:</strong> ${order.shippingAddress.name}</p>
            <p><strong>Phone:</strong> ${order.shippingAddress.phone}</p>
            <p><strong>Address:</strong> ${order.shippingAddress.ward}, ${order.shippingAddress.district}, ${order.shippingAddress.province}</p>
        </div>
        <div class="order-summary">
            <h3>Total Price: ${order.totalPrice?.toLocaleString()} VND</h3>
        </div>
        <div class="footer">
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Status:</strong> ${order.status}</p>
        </div>
        <p>Xem chi tiết đơn hàng tại <a href='http://localhost:3000/myOrder'>Nhấn vào đây</a></p>
    </div>
</body>
</html>
`;
return htmlSendMail
}