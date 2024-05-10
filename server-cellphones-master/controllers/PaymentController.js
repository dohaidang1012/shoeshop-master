import { OrderModel } from "../models/OrderModel.js";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import querystring from "qs";
import sha256 from "sha256";
import dateFormat from "dateformat";
import crypto from 'crypto'
import moment from "moment";

let tmnCode = process.env.VNP_TMN_CODE;
let secretKey = process.env.VNP_HASH_SECRET;
let vnpUrl  = process.env.VNP_URL;
let returnUrl = process.env.VNP_RETURN_URL;

export const createPayment = expressAsyncHandler(async (req, res) => {
  let urlFinal = vnpUrl
  console.log(req.body)
  const orderItems = req.body.orderItems.map(item => {
    return {
      name: item.name,
      qty: item.qty,
      image: item.image,
      salePrice: item.salePrice,
      product: item,
      color: item.colorSelected,
      size: item.sizeSelected
    }
  })

  const order = new OrderModel({
    order_code: "",
    to_ward_code: req.body.to_ward_code,
    to_district_id: req.body.to_district_id,
    cancelOrder: false,
    orderItems: orderItems,
    shippingAddress: {
      province: req.body.shippingAddress?.province || '',
      district: req.body.shippingAddress?.district  || '',
      ward: req.body.shippingAddress?.ward || '',
      detail: req.body.shippingAddress?.more || '',
      name: req.body.shippingAddress?.name || '',
      phone: req.body.shippingAddress?.phone || '',
    },
    paymentMethod: req.body.paymentMethod,
    paymentResult: req.body.paymentResult
      ? {
          id: req.body.paymentResult.id,
          status: req.body.paymentResult.status,
          update_time: req.body.paymentResult.update_time,
          email_address: req.body.paymentResult.payer.email_address,
        }
      : "",
    totalPrice: req.body.totalPrice,
    status: req.body.status ? req.body.status : "pendding",
    name: req.body.name,
    user: req.body.user,
  });

  order.save();

  // 
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;


  let orderId = req.body.orderId || order._id.toString();
  let amount = req.body.totalPrice * 100;
  // let bankCode = req.body.bankCode || "NCB";

  let locale = req.body.language || 'vn';
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "ThanhtoanchomaGD:" + orderId;
  vnp_Params["vnp_OrderType"] = "billpayment";
  vnp_Params["vnp_Amount"] = amount;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  // if (bankCode !== null && bankCode !== "") {
  //   vnp_Params["vnp_BankCode"] = bankCode;
  // }

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  urlFinal  += "?" + querystring.stringify(vnp_Params, { encode: false });
  // Nối querystring với URL
  res.status(200).json({ code: "00", data: urlFinal  });
});

export const returnPayment = expressAsyncHandler(async (req, res) => {
  console.log('returnPayment')
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = sortObject(vnp_Params);
    // const signData =
    //   secretKey + querystring.stringify(vnp_Params, { encode: false });

      // 
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");  
    // new code
    // var signData = querystring.stringify(vnp_Params, { encode: false });
    // var hmac = crypto.createHmac("sha512", secretKey);
    // var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    //end

    const checkSum = sha256(signData);

    const id = vnp_Params.vnp_TxnRef;

    // res.status(200).json({ code: vnp_Params.vnp_ResponseCode });
    if (secureHash === signed) {
      console.log('if 1')
      if (vnp_Params.vnp_ResponseCode == "00") {
        console.log('if 2')
        res.status(200).json({ code: vnp_Params.vnp_ResponseCode });
      } else {
        const DeleteOrder = await OrderModel.findById({ _id: id });
        await DeleteOrder.remove();
        res.status(200).json({ code: vnp_Params.vnp_ResponseCode });
      }
    } else {
      console.log('else')
      res.status(200).json({ code: "97" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const inpPayment = async (req, res) => {
  console.log('inpPayment')
  let vnp_Params = req.query;
  const secureHash = vnp_Params.vnp_SecureHash;

  delete vnp_Params.vnp_SecureHash;
  delete vnp_Params.vnp_SecureHashType;

  vnp_Params = sortObject(vnp_Params);

  const signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  const checkSum = sha256(signData);

  const id = vnp_Params.vnp_TxnRef;
  
  if (secureHash === checkSum) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}