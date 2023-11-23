import { TUser } from './user.interface';
import UserModel from './user.model';

const createNewUser = async (user: TUser): Promise<TUser> => {
  return await UserModel.create(user);
};

const retrieveAllUsers = async (): Promise<TUser[]> => {
  return await UserModel.find();
};

const retrieveSpecificUserByID = async (id: string): Promise<TUser | null> => {
  return await UserModel.findOne({ userId: id });
};

const updateUserInformation = async (id: string, updatedDoc: TUser) => {
  return await UserModel.findByIdAndUpdate({ userId: id }, updatedDoc, {
    new: true,
    runValidators: true,
  });
};

const deleteAUser = async (id: string): Promise<TUser | null> => {
  return await UserModel.findByIdAndDelete({ userId: id });
};

export const userServices = {
  createNewUser,
  retrieveAllUsers,
  retrieveSpecificUserByID,
  updateUserInformation,
  deleteAUser,
};
