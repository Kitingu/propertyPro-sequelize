import PropertyServices from "../services/property";
import { Response } from "../helpers/utils";
const Property = PropertyServices;
const userResponse = new Response();

export default async (req, res, next) => {
  const { phoneNumber } = req.user;
  const { address, price, city } = req.body;

  const properties = await Property.checkDuplicates(
    address,
    city,
    price,
    phoneNumber
  );
  if (properties.length > 0) {
    userResponse.setError(409, "Duplicate properties are not allowed");
    return userResponse.send(res);
  }

  next();
};
