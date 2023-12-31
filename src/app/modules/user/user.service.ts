import { TUser } from './user.interface';
import UserModel from './user.model';

// Service for creating user
const createNewUser = async (user: TUser): Promise<TUser> => {
  return await UserModel.create(user);
};

//  Service for get all users
const retrieveAllUsers = async (): Promise<TUser[]> => {
  return await UserModel.find().select({
    password: 0,
    userId: 0,
    hobbies: 0,
    isActive: 0,
    _id: 0,
    __v: 0,
  });
};

// Services for get a single user
const retrieveSpecificUserByID = async (id: number) => {
  return await UserModel.findOne({ userId: id }).select({
    password: 0,
    _id: 0,
    __v: 0,
  });
};

// Service for update user information
const updateUserInformation = async (
  id: number,
  updatedDoc: Partial<TUser>,
) => {
  const { fullName, address, ...others } = updatedDoc;

  const modifiedUpdatedData: Record<string, unknown> = { ...others };

  if (fullName && Object.keys(fullName).length) {
    for (const [key, value] of Object.entries(fullName)) {
      modifiedUpdatedData[`fullName.${key}`] = value;
    }
  }

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdatedData[`address.${key}`] = value;
    }
  }
  return await UserModel.findOneAndUpdate({ userId: id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  }).select({ _id: 0, password: 0, __v: 0 });
};

// Service for delete user
const deleteAUser = async (id: number): Promise<TUser | null> => {
  return await UserModel.findOneAndDelete({ userId: id });
};

export const userServices = {
  createNewUser,
  retrieveAllUsers,
  retrieveSpecificUserByID,
  updateUserInformation,
  deleteAUser,
};
