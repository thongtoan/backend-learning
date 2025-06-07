import { findById } from "../services/apikey.service.js";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "AUTHORIZATION",
};

const apiKey = async (req, res, next) => {
  try {
    console.log(`APIKEY STEP`);

    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).toString({
        message: "Forbidden Error",
      });
    }
    req.objKey = objKey;
    return next();
  } catch (err) {}
};

const permission = (permission) => {
  return (req, res, next) => {
    console.log(`PERMISSION STEP`);
    if (!req.objKey.permissions) {
      return res.status(403).toString({
        message: "Permission denied",
      });
    }
    console.log(`permissions::`, req.objKey.permissions);
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).toString({
        message: "Permission denied",
      });
    }
    return next();
  };
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export { apiKey, permission, asyncHandler };
