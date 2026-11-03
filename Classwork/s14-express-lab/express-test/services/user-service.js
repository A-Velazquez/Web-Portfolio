import { User } from "../models/user";

const createUser = async ({ username, name, email, password }) => {
  const user = await User.create({ 
    username, 
    name, 
    email, 
    password 
   }).catch((dbError) => console.error(`Error creating user: ${dbError.message}`));
   return user;
  
};

export const findUser = async (username) => {
    const userFound = await User.findOne({ username }).catch((dbError) => console.error(`Error finding user: ${dbError.message}`));
    return userFound;
};

export const findUsers = async (name) => {
    return await User.find({ name }).sort({ name: 1 }).catch((dbError) => console.error(`Error finding users: ${dbError.message}`));
}