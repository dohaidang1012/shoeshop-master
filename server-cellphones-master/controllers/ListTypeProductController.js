import expressAsyncHandler from 'express-async-handler'
import cloudinary from 'cloudinary'
import { ListTypeProductModel } from '../models/ListTypeProductModel.js'

export const getAllTypeProduct = expressAsyncHandler(async (req, res) => {
    const allType = await ListTypeProductModel.find({})
    res.send(allType)
})

export const createNewTypeProduct = expressAsyncHandler(async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "dev_setups",
      });
    const newType = new ListTypeProductModel({
        name: req.body.name,
        img: result.secure_url,
        cloudinary_id: result.public_id,
    }) 

    await newType.save()
    res.send(newType)
})

export const deleteTypeProduct = expressAsyncHandler(async (req, res) => {
    const typeProduct = await ListTypeProductModel.findById({_id: req.params.id})

    await cloudinary.uploader.destroy(typeProduct.cloudinary_id)

    if(typeProduct){
        await typeProduct.remove()
        res.send({msg: 'deleted type product'})
    }else{
        res.send({msg: 'product not found'})
    }

})

export const getAllTypeProductByPage = expressAsyncHandler(async (req, res) => {
    var perPage = 4;
    var page = req.params.page || 1;
    ListTypeProductModel.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function (err, category) {
        ListTypeProductModel.countDocuments().exec(function (err, count) {
          if (err) return next(err);
          res.send({
            categories: category,
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
})

export const updateNewTypeProduct = expressAsyncHandler(async (req, res) => {
    let updateData = {
        name: req.body.name
    };

    if(req.file && req.file.path) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "dev_setups",
        });
        updateData.img = result.secure_url;
        updateData.cloudinary_id = result.public_id;
    }

    try {
        const filter =  { _id: req.body._id }
        const update = updateData;
        const options = { new: true }; // Tùy chọn này để trả về tài liệu sau khi cập nhật

        const updatedType = await ListTypeProductModel.findOneAndUpdate(filter, update, options);
        
        res.status(200).json({ success: true, data: updatedType });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi cập nhật dữ liệu." });
    }
});


export const getTypeProductById = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const item = await ListTypeProductModel.findById({_id: id});
    res.status(200).json({ success: true, data: item });
})