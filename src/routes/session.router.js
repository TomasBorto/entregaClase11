const { Router } = require("express");
const { userModel } = require("../models/users.model.js");
const { createHash, checkValidPassword } = require("../utils/brcyptPass.js");
const passport = require("passport");
const { generateToken, authToken } = require("../utils/jsonwebtoken.js");

const router = Router();

const users = [];

//
router.get("/", (req, res) => {
  res.render("login", {});
});

//
// router.post('/login',(req, res)=> {
//     const {username, password} = req.body

//     if(username !== 'fede' || password !== 'fede'){
//         return res.status(401).send('pass o username no es correcto')
//     }
//     req.session.user  = username
//     req.session.admin = true

//     res.send('login success')
// })

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) return res.status(400).send({ status: "error", message: "Revisar usuario y contraseña" });
  const accessToken = generateToken(user);
  res.send({
    status: "success",
    payload: accessToken,
  });
});

router.get("/current", authToken, (req, res) => {
  res.send({
    status: "success",
    payload: req.user,
  });
});

// GET Registro

router.get("/register", (req, res) => {
  res.render("register");
});

// POST Registro

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = users.find((user) => user.email === email);
  if (userExist) return res.status(400).send({ status: "error", message: "El usuario ya existe" });
  const newUser = {
    name,
    email,
    password,
  };

  users.push();

  const accessToken = generateToken(newUser);

  res.send({
    status: "success",
    message: "Usuario creado",
    accessToken,
  });
});

router.get("/github", passport.authenticate("github"));

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/session/failregister" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/productos");
  }
);

router.get("/failregister", (req, res) => {
  res.send({ status: "error", message: "Error al crear el usuario" });
});

router.put("/recoverypass", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return res.status(401).send({ status: "error", message: "El usuario no existe" });
  user.password = createHash(password);
  await user.save();
  res.send({ status: "success", message: "Contraseña actualizada" });
});

router.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Se ha visitado el sitio ${req.session.counter} veces.`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send({ status: "Logout error", message: err });
    res.send("logou ok");
  });
});

module.exports = router;
