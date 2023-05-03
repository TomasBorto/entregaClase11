const passport = require("passport");
const { userModel } = require("../models/users.model");
const { createHash, checkValidPassword } = require("../utils/brcyptPass");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2");

const initializePassport = () => {
  passport.use(
    "register", // nombre que le damos a la estrategia
    new LocalStrategy(
      {
        passReqToCallback: true, // acceso al req
        usernameField: "email",
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, username } = req.body;
          // buscar el usuario en la base de datos
          const user = await userModel.findOne({ email });
          console.log({ user });
          // done si  hay usuario
          if (user) {
            done(null, false, { message: "El usuario ya existe" });
          }
          // hash password
          const hashedPassword = createHash(password);
          // crear usuario
          const newUser = {
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
          };
          const result = await userModel.create(newUser);

          // done con el usuario
          return done(null, result);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });
          if (!user) {
            return done(null, false);
          }
          const isValidPassword = checkValidPassword({
            hashedPassword: user.password,
            password,
          });
          if (!isValidPassword) {
            done(null, false);
          }
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.3775b1fdeab032c3",
        clientSecret: "3f68cf015e3f1976faf92bbaf6b73af33cfd3673",
        callbackURL: "http://localhost:8080/session/githubcallback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log({ email: profile.emails[0].value });
          const user = await userModel.findOne({ email: profile.emails[0].value });
          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: profile._json.name,
              username: profile.username,
              email: profile.emails[0].value,
            };
            console.log({ newUser });
            const result = await userModel.create(newUser);
            return done(null, result);
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = {
  initializePassport,
};
