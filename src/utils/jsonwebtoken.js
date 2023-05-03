const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "CoderKeyQuefuncionaComoUnSecret";

const generateToken = (user) => {
  const token = jwt.sign(
    {
      user,
    },
    PRIVATE_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

// token = 'Bearer asdasdasdasdasdds'

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ status: "error", message: "No se envió el token" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(401).send({ status: "error", message: "Token inválido" });
    req.user = credentials.user;
    next();
  });
};

module.exports = {
  generateToken,
  authToken,
};
