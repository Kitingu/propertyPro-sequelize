import db from "../models";
import userProfile from "../helpers/userUtils";
import UserServices from "../servces/user.js";
import { Response, hashPassword, compareHash } from "../helpers/utils";
import { encodeToken, createPayload } from "../helpers/jwt";

const userResponse = new Response();

const userController = {
  /**
   *
   * @param {*} req
   * @param {*} res
   * returns object
   */
  async signUp(req, res) {
    const newUser = req.body;
    const { email } = newUser;
    const user = await UserServices.findByEmail(email);
    if (!user) {
      const hashedPassword = hashPassword(newUser.password);
      try {
        const user = await db.User.create({
          ...newUser,
          password: hashedPassword
        });
        const token = encodeToken(
          createPayload(
            newUser.firstname,
            newUser.email,
            newUser.isAgent,
            newUser.isAdmin
          )
        );
        user.token = token;
        userResponse.setSuccess(
          201,
          "User registered successfully",
          userProfile(user)
        );
        return userResponse.send(res);
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      userResponse.setError(
        409,
        `user with ${email} already exists please login`
      );
      return userResponse.send(res);
    }
  },
  /**
   * @author Benedict
   * @param {*} req
   * @param {*} res
   * @returns {*} object
   */
  async getAllUsers(req, res) {
    try {
      const users = await db.User.findAll();
      return res.status(200).send(users.map(user => userProfile(user)));
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async signIn(req, res) {
    const { email, password } = req.body;
    if (!email) {
      userResponse.setError(400, "email is required");
      return userResponse.send(res);
    }
    if (!password) {
      userResponse.setError(400, "password is required");
      return userResponse.send(res);
    }
    const user = await UserServices.findByEmail(email);

    if (user) {
      if (compareHash(password, user.password)) {
        const token = encodeToken(
          createPayload(user.firstname, user.email, user.isAgent, user.isAdmin)
        );
        userResponse.setSuccess(200, "logged in successfully", token);
        return userResponse.send(res);
      }

      userResponse.setError(401, "Invalid user login credentials");
      return userResponse.send(res);
    }

    userResponse.setError(400, "Invalid user login credentials");
    return userResponse.send(res);
  }
};

export default userController;
