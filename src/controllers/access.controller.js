class AccessController {
  signup = async (req, res, next) => {
    try {
      console.log(`[P]::signup:`, req.body);
      return res.status(201).json({
        metadata: { userId: 1 },
      });
    } catch (err) {
      next(err);
    }
  };
}

export default AccessController;
