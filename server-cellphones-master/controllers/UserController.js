import {UserModel} from '../models/UserModel.js'
import {generateToken} from '../untils/until.js'
import expressAsyncHandler from 'express-async-handler'

export const getAllUser = (req, res) => {
    UserModel.find({})
        .then(user => res.send(user))
        .catch(err => console.log(err))
}


export const registerUser = expressAsyncHandler(async (req, res) => {
    const user = new UserModel({
        // _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: '',
        phone: '',
        isAdmin: false,
        dailyVisits: [{
            view: 0,
            day: Date.now()
        }]
    })
    const createUser = user.save();
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address ,
        phone: user.phone,
        token: generateToken(user),
    });
})

export const login = expressAsyncHandler(async (req, res) => {
    const user = await  UserModel.findOne({email: req.body.email, password: req.body.password})
    if(user){ 
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            address: user.address ,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
    }else{
        res.status(401).send({message: "invalid email or password"})
    }
})

export const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById({_id: req.params.id})

    if(user){
        await user.remove()
        res.send({message: 'user deleted'})
    }else{
        res.send({message: 'user not exists'})
    }
})

export const UpdateDailyVisits = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const currentDate = new Date();
    currentDate.toDateString()
    
    try {
        const user = await UserModel.findById({ _id: id });

        if (user) {
            // Kiểm tra nếu ngày hiện tại đã được ghi vào danh sách lượt truy cập hàng ngày hay chưa
            const lastVisit = user.dailyVisits[user.dailyVisits.length - 1];
            console.log(lastVisit)
            const lastVisitDate = new Date(lastVisit.day).toDateString();
            if (currentDate === lastVisitDate) {
                // Nếu ngày hiện tại đã được ghi vào danh sách lượt truy cập hàng ngày,
                // tăng số lượt truy cập lên 1
                lastVisit.view += 1;
            } else {
                // Nếu ngày hiện tại chưa được ghi vào danh sách lượt truy cập hàng ngày,
                // thêm một mục mới vào danh sách với số lượt truy cập là 1
                user.dailyVisits.push({ view: 1, day: new Date() });
            }

            // Lưu thay đổi vào cơ sở dữ liệu
            await user.save();
            res.send({ message: 'Daily visit count updated' });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating daily visit count', error });
    }
});


export const getVisitsByCurrentDate = expressAsyncHandler(async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        
        // Sử dụng aggregation
        UserModel.aggregate([
          {
            $unwind: "$dailyVisits" // Tách mảng dailyVisits ra thành các documents riêng lẻ
          },
          {
            $match: {
              "dailyVisits.day": {
                $gte: startOfDay,
                $lt: endOfDay
              }
            }
          },
          {
            $project: {
              _id: 0, // Loại bỏ trường _id
            //   name: 0, // Bao gồm trường name của user
            //   email: 0, // Bao gồm trường email của user
              "dailyVisits.view": 1, // Bao gồm số lượng view
            //   "dailyVisits.day": 0 // Bao gồm ngày
            }
          }
        ])
        .exec((err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          // Kết quả cuối cùng
          const data = result.reduce((total, currentValue) => total + currentValue.dailyVisits.view, 0)

          res.status(200).send({ message: 'ok', data });
        });
      

    } catch (error) {
        res.status(500).send({ message: 'Error fetching visits by current date', error });
    }
});

export const changeRule = expressAsyncHandler(async (req, res) => {
    try {
        const user = await UserModel.findById({_id: req.params.id})
        if(user.isAdmin) {
            user.isAdmin = !user.isAdmin
            await user.save()
            res.send({message: 'updated rules'})
        } 
        res.send({message: 'Require rule admin'})
    } catch (error) {
        res.send({message: 'user not exists'})
    }
})