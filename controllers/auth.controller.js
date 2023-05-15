const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authController = {
  // регистрация
  signUp: async (req, res) => {
    try {
      const { name, surname, login, password, role, branchId } = req.body;

      if (
        password.length <= 0 ||
        login.length <= 0 ||
        name.length <= 0 ||
        surname.length <= 0
      ) {
        return res.json({ error: "Все поля должны быть заполнены" });
      }

      if (name.replace(/[А-я, A-z]/g, "").length !== 0) {
        return res.json({ error: "Недопустимое имя"});
      }

      if (surname.replace(/[А-я, A-z]/g, "").length !== 0) {
        return res.json({ error: "Недопустимая фамилия"});
      }

      if (login.replace(/[A-z]/g, "").length !== 0) {
        return res.json({ error: "Недопустимый логин"});
      }

      if (login.length < 5) {
        return res.json({ error: "Минимальная длина логина: 5 символа" });
      }

      if (password.length < 5) {
        return res.json({ error: "Минимальная длина пароля: 5 символов" });
      }

      const condidate = await User.findOne({ login });

      if (condidate) {
        return res.status(400).json({ error: "Такой логин уже существует" });
      }

      const hashPassword = await bcrypt.hash(password, 7);

      const currentUser = await User.create({
        name,
        surname,
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
        name: condidate.name,
        surname: condidate.surname,
        login: condidate.login,
        role: condidate.role,
        branch: condidate.branchId?.name,
        branchId: condidate.branchId?._id,
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
      const users = await User.find({ role: "USER" }).populate("branchId");
      res.json(users);
    } catch (error) {
      res.json({ error: error });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate("branchId");
      res.json(user);
    } catch (error) {
      res.json({ error: error });
    }
  },
};
