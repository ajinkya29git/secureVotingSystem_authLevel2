const jwt = require("jsonwebtoken");

const verifyOptions = {
  expiresIn: process.env.LEVEL1_EXPIRE,
  algorithms: ["RS256"]
}

exports.authorizeRequest = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send("Not authorized to access this router");
  }

  try {
    const decoded = jwt.verify(token, process.env.LEVEL1_PUBLIC, verifyOptions);
    if(decoded) {
        req.email = decoded.email;
        next();
    }
    else {
      return res.status(401).send("Not authorized to access this router");
    }
  } catch (err) {
    return res.status(401).send("Not authorized to access this router");
  }
};
