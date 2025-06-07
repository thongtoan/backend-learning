import UserModel from "../models/shop.models.js";
import bcrypt from "bcrypt";
import KeyTokenService from "./keyToken.service.js";
import createTokenPair from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";
import crypto from "crypto";
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
        return {
          code: "xxx",
          message: "Shop already registered!",
        };
      }

      const passwordHarsh = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        name,
        email,
        password: passwordHarsh,
        roles: [RoleUser.SHOP],
      });

      if (newUser) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

        console.log({ privateKey, publicKey });

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newUser._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "publicKeyString error",
          };
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString);
        console.log(111, publicKeyObject);

        const tokens = await createTokenPair(
          { userId: newUser._id, email },
          publicKeyObject,
          privateKey
        );
        console.log(`Createed Token Success`, tokens);

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
}

export default AccessService;
