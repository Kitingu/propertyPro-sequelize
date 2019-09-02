import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const createPayload = (firstname, email, isAgent, isAdmin) => ({
  firstname,
  email,
  isAgent,
  isAdmin
});
export const encodeToken = user => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: "2 days"
  });

  return token;
};


