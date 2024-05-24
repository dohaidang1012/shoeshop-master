import jwt from 'jsonwebtoken'
import multer from "multer";
import path from "path";
import nodeMailer from 'nodemailer'
import asyncHandler from 'express-async-handler'

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_SECRET || "caokhahieu",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "caokhahieu",
      (err, decode) => {
        if (err) {
          res.status.send({ message: "invalid token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "no token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "invalid admin token" });
  }
};

export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext.toLocaleLowerCase() !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

export function PinComment(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);

  return arr;
}

export const sendMail = asyncHandler( async({email, html, subject}) => {
  console.log(process.env.EMAIL_NAME)
  console.log(process.env.EMAIL_APP_PASSWORD)
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
  
    const info = await transporter.sendMail({
      from: '"Cửa hàng điện tử" <no-reply@cuahangdientu.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html, // html body
    });
  
    return info
})

