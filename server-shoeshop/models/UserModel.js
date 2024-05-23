import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const User = new Schema({
    name:{type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type:String},
    phone: {type: String},
    isAdmin: {type: Boolean},
    dailyVisits: [
      {
        view: {type: Number, default: 0},
        day:  {type: Date}
      }
    ]
},
{
    timestamps: true,
  },
)

export const UserModel = mongoose.model('User', User)