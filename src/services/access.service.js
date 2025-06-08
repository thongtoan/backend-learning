import UserModel from "../models/shop.models.js";
import bcrypt from "bcrypt";
import KeyTokenService from "./keyToken.service.js";
import createTokenPair from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";
import crypto from "crypto";
import {
  AuthFailureError,
  BadRequestError,
  ConflictRequestError,
} from "../core/error.response.js";
import { findByEmail } from "./user.service.js";
import { log } from "console";

const RoleUser = {
  SHOP: "SHOP",
  WRITRE: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const holderUser = await UserModel.findOne({ email }).lean();
      if (holderUser) {
        throw new BadRequestError("Error: User already registered");
      }

      const passwordHarsh = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        name,
        email,
        password: passwordHarsh,
        roles: [RoleUser.SHOP],
      });

      if (newUser) {
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");
        console.log({ privateKey, publicKey });

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newUser._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          throw new BadRequestError("Error: Store key error");
        }

        const tokens = await createTokenPair(
          { userId: newUser._id, email },
          publicKey,
          privateKey
        );
        console.log(`Created Token Success`, tokens);

        return {
          code: 201,
          metadata: {
            user: getInfoData({
              fields: ["_id", "name", "email"],
              object: newUser,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        messsage: error.message,
        status: "error",
      };
    }
  };

  static login = async ({ email, password, refreshToken = null }) => {
    const isUser = await findByEmail({ email });
    if (!isUser) throw new BadRequestError("Shop not registered");

    const isMatch = bcrypt.compare(password, isUser.password);
    if (!isMatch) throw new AuthFailureError("Authentication error");

    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");

    const { _id: userId } = isUser;
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
      userId,
    });

    return {
      user: getInfoData({ fields: ["_id", "name", "email"], object: isUser }),
      tokens,
    };
  };
}

export default AccessService;
