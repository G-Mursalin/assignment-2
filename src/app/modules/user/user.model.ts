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
    unique: true,
    trim: true,
    validate: {
      validator: (val: string) => val.trim().length >= 3,
      message: 'User name should be minimum 3 characters long',
    },
    required: [true, 'Please give us your user name'],
  },
  password: {
    type: String,
    required: [true, 'Please give us a password'],
  },
  fullName: {
    firstName: {
      type: String,
      validate: {
        validator: (val: string) => val.trim().length > 0,
        message: 'Please provide a valid first name',
      },
    },
    lastName: {
      type: String,
      validate: {
        validator: (val: string) => val.trim().length > 0,
        message: 'Please provide a valid last name',
      },
    },
  },
  age: {
    type: Number,
    required: [true, 'Please tell us your age'],
    min: [1, 'Age can not be negative or zero'],
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
      validate: {
        validator: (val: string) => val.trim().length > 0,
        message: 'Please tell us your valid street name',
      },
      required: [true, 'Tell us your street name'],
    },
    city: {
      type: String,
      trim: true,
      validate: {
        validator: (val: string) => val.trim().length > 0,
        message: 'Please tell us your valid city name',
      },
      required: [true, 'Tell us your city name'],
    },
    country: {
      type: String,
      trim: true,
      validate: {
        validator: (val: string) => val.trim().length > 0,
        message: 'Please tell us your valid country name',
      },
      required: [true, 'Tell us your country name'],
    },
  },
});

// Middleware for hash the incoming password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));

  next();
});

// Creating static method for user model
userSchema.statics.isUserExists = async function (id: number) {
  return await UserModel.findOne({ userId: id });
};

// User Model
const UserModel = model<TUser, UserModelWithStaticMethod>('User', userSchema);

export default UserModel;
