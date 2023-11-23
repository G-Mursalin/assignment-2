import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { TUser, UserModelWithStaticMethod } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser, UserModelWithStaticMethod>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'Please give us your user ID'],
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'Please us your user name'],
  },
  password: {
    type: String,
    required: [true, 'Please give us a password'],
  },
  fullName: {
    firstName: { type: String },
    lastName: { type: String },
  },
  age: {
    type: Number,
    required: [true, 'Please tell us your age'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Please tell us your email'],
    validate: {
      validator: function (email: string) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not valid email',
    },
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [{ type: String }],
  address: {
    street: {
      type: String,
      trim: true,
      required: [true, 'Tell us your street name'],
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'Tell us your city name'],
    },
    country: {
      type: String,
      trim: true,
      required: [true, 'Tell us your country name'],
    },
  },
});

// Middleware for hash the incoming password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));

  next();
});

userSchema.statics.isUserExists = async function (id: string) {
  return await UserModel.findOne({ userId: id });
};

// User Model
const UserModel = model<TUser, UserModelWithStaticMethod>('User', userSchema);

export default UserModel;
