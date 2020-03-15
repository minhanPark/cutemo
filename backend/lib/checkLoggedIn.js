const checkLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ code: 401, e: "Unauthorized" });
  }
  return next();
};

export default checkLoggedIn;
