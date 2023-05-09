const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      "IidIsUserIsAdmin@mealskellynodes&eiri94&43radlfkh&%73adfj",
      (err, user) => {
        if (err) res.status(403).json("Token is expired or is not valid");
        req.user = user;
        next();
      }
    );
  } else {
    return res.status(401).json("You are not aunthenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    next();
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
