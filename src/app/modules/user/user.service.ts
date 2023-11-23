import { TUser } from './user.interface';
import UserModel from './user.model';

const createNewUser = async (user: TUser): Promise<TUser> => {
  return await UserModel.create(user);
};

const retrieveAllUsers = async (): Promise<TUser[]> => {
  return await UserModel.find().select(
    'username fullName age email address -_id',
  );
};

const retrieveSpecificUserByID = async (id: string) => {
  return await UserModel.findOne({ userId: id }).select('-password -__v -_id');
};

const updateUserInformation = async (id: string, updatedDoc: TUser) => {
  return await UserModel.findOneAndUpdate({ userId: id }, updatedDoc, {
    new: true,
    runValidators: true,
  });
};

const deleteAUser = async (id: string): Promise<TUser | null> => {
  return await UserModel.findOneAndDelete({ userId: id });
};

export const userServices = {
  createNewUser,
  retrieveAllUsers,
  retrieveSpecificUserByID,
  updateUserInformation,
  deleteAUser,
};
