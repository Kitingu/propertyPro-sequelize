import bcrypt from "bcryptjs";

export const hashPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const compareHash = (password, hashedPassword) => {
  if (bcrypt.compareSync(password, hashedPassword)) {
    return true;
  }

  return false;
};

export class Response {
  constructor() {
    this.statusCode = null;
    this.status = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = "success";
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = "error";
  }

  send(res) {
    const result = {
      status: this.statusCode,
      message: this.message,
      data: this.data
    };

    if (this.type === "success") {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.statusCode,
      error: this.message
    });
  }
}

export const checkOwner = (req, property) => {
  const user = req.user.email;
  const { owner } = property;
  return user === owner;
};

