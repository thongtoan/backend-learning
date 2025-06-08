import KeyModel from "../models/keytoken.model.js";

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      // lv0
      // const tokens = await KeyModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });

      // return tokens ? tokens.publicKey : null;

      // level up
      const filter = { user: userId },
        update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
        options = { upsert: true, new: true };
      const tokens = await KeyModel.findOneAndUpdate(filter, update, options);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

export default KeyTokenService;
