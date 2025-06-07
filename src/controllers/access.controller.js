import { CREATED } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {
  // static signUp = async (req, res, next) => {
  //   try {
  //     console.log(`[P]::signup:`, req.body);
  //     return res.status(201).json(await AccessService.signUp(req.body));
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  static signUp = async (req, res) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
    // return res.status(201).json(await AccessService.signUp(req.body));
  };
}

export default AccessController;
