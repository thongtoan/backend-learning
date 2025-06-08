import UserModel from "../models/shop.models.js";

const findByEmail = async ({
  email,
  select = { email: 1, password: 2, name: 1, status: 1, roles: 1 },
}) => {
  return await UserModel.findOne({ email }).select(select).lean();
};

export { findByEmail };
