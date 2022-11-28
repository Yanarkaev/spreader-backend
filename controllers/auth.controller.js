const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authController = {
  // регистрация
  signUp: async (req, res) => {
    try {
      const { login, password, role, branchId } = req.body;

      if (password.length <= 0 || login.length <= 0) {
        return res.json({ error: "все поля должны быть заполнены" });
      }

      if (login.length < 3) {
        return res.json({ error: "минимальная длина логина: 3 символа" });
      }

      if (password.length < 5) {
        return res.json({ error: "минимальная длина пароля: 5 символов" });
      }

      const condidate = await User.findOne({ login });
      if (condidate) {
        return res.status(400).json({ error: "Такой логин уже существует" });
      }

      const hashPassword = await bcrypt.hash(password, 7);

      const currentUser = await User.create({
        login,
        password: hashPassword,
        role,
        branchId,
      });

      res.json(currentUser);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // вход
  signIn: async (req, res) => {
    try {
      const { login, password } = req.body;

      const condidate = await User.findOne({ login }).populate("branchId");

      const validPassword = await bcrypt.compare(password, condidate.password);

      if (!validPassword) {
        return res.json({ error: "неверный логин или пароль" });
      }

      const payload = {
        id: condidate._id,
        login: condidate.login,
        role: condidate.role,
        branch: condidate.branchId?.name
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

      if (!token) {
        return res.json({ error: "неверный токен" });
      }

      res.json(token);
    } catch (error) {
      res.json({ error: "неверный логин или пароль" });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find({role: "USER"}).populate('branchId')
      res.json(users)
    } catch (error) {
      res.json({error: error})
    }
  }
};
