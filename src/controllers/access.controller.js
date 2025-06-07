import AccessService from "../services/access.service.js";

class AccessController {
  static signUp = async (req, res, next) => {
    try {
      console.log(`[P]::signup:`, req.body);
      return res.status(201).json(await AccessService.signUp(req.body));
    } catch (err) {
      next(err);
    }
  };
}

export default AccessController;
