import dotenv from "dotenv";
import db from "../models";
import { checkOwner, Response } from "../helpers/utils";
import PropertyServices from "../services/property";

const Property = db.Property;
const userResponse = new Response();
const propertyController = {
  async createProperty(req, res) {
    const ownerEmail = req.user.email;
    const { state, city, type, price, address } = req.body;
    const ownerPhoneNumber = req.user.phoneNumber;
    console.log(ownerPhoneNumber);

    try {
      const image_url = req.file.url;

      const property = await Property.create({
        state,
        city,
        type,
        price,
        address,
        owner: ownerEmail,
        ownerPhoneNumber,
        image_url
      });
      userResponse.setSuccess(
        201,
        "property advert created successfully",
        property
      );
      return userResponse.send(res);
    } catch (error) {
      userResponse.setError(
        400,
        error
        // "please provide an image of type png, gif or jpg"
      );
      return userResponse.send(res);
    }
  },

  async getAll(req, res) {
    const allProperties = await Property.findAll();
    // const types = ["two bedroom", "three bedroom", "bedsitter", "mini-flat"];
    const { type } = req.query;

    if (type) {
      const results = await PropertyServices.getPropertyByField("type", type);

      if (results) {
        userResponse.setSuccess(
          200,
          "properties fetched successfully",
          results
        );
        return userResponse.send(res);
      }
      userResponse.setError(
        404,
        "couldnt find anything that matches the filters"
      );
      return userResponse.send(res);
    }
    if (!allProperties.length) {
      userResponse.setSuccess(
        200,
        "no available properties at the moment",
        allProperties
      );
      return userResponse.send(res);
    }

    userResponse.setSuccess(
      200,
      "properties fetched successfully",
      allProperties
    );
    return userResponse.send(res);
  },
  async getSpecificAdvert(req, res) {
    const { id } = req.params;
    const property = await PropertyServices.getPropertyByField(
      "id",
      parseInt(id)
    );
    if (property) {
      userResponse.setSuccess(
        200,
        "property advert fetched successfully",
        property
      );
      return userResponse.send(res);
    }

    userResponse.setError(404, `A property with id ${id} does not exist`);
    return userResponse.send(res);
  },
  async deleteProperty(req, res) {
    const { id } = req.params;
    const property = await PropertyServices.getPropertyByField(
      "id",
      parseInt(id)
    );
    if (property) {
      if (checkOwner(req, property)) {
        await PropertyServices.deleteProperty(id);
        userResponse.setSuccess(200, "advert deleted successfully");
        userResponse.send(res);
      } else {
        userResponse.setError(
          401,
          "you dont have the privilege to perform this task"
        );
        return userResponse.send(res);
      }
    } else {
      userResponse.setError(404, `A property with id${id} does not exist`);
      return userResponse.send(res);
    }
  },
  async changeStatus(req, res) {
    const { id } = req.params;
    let property = await PropertyServices.getPropertyByField(
      "id",
      parseInt(id)
    );

    if (property) {
      if (checkOwner(req, property)) {
        if (property.status == "sold") {
          userResponse.setError(400, "property is already sold");
          return userResponse.send(res);
        }
        property = await PropertyServices.updateProperty(id,"status", "sold");
        userResponse.setSuccess(
          200,
          "property advert updated successfully",
          property
        );
        return userResponse.send(res);
      }

      userResponse.setError(
        401,
        "you dont have the privilege to perform this task"
      );
      return userResponse.send(res);
    }

    userResponse.setError(404, `A property with id ${id} does not exist`);
    return userResponse.send(res);
  },
  async updatePrice(req, res) {
    const { id } = req.params;
    let property = await PropertyServices.getPropertyByField(
      "id",
      parseInt(id)
    );
    const { price } = req.body;

    if (property) {
      if (price == property.price) {
        userResponse.setError(400, "No changes were made");
        return userResponse.send(res);
      }
      if (checkOwner(req, property)) {
        property = await PropertyServices.updateProperty(id, "price", price);
        userResponse.setSuccess(
          "200",
          "Property updated successfully",
          property
        );
        return userResponse.send(res);
      }

      userResponse.setError(
        "401",
        "you dont have the privilege to perform this task"
      );
      return userResponse.send(res);
    }

    userResponse.setError("404", `A property with id ${id} does not exist`);
    return userResponse.send(res);
  },
  async flagProperty(req, res) {
    const { id } = req.params;
    const property = await Property.getPropertyByField(
      "propertyid",
      parseInt(id)
    );
    const { reason, description } = req.body;

    if (property) {
      if (checkOwner(req, property)) {
        userResponse.setError("403", "you can not flag your own property");
        return userResponse.send(res);
      }

      const owner = req.user.email;

      await Property.flagProperty(owner, id, reason, description);
      userResponse.setSuccess("200", "Property flagged successfully");
      return userResponse.send(res);
    }
  },
  async getFlags(req, res) {
    const { id } = req.params;
    const property = await Property.getPropertyByField(
      "propertyid",
      parseInt(id)
    );
    if (property) {
      const flags = await Property.getFlags(id);
      if (flags) {
        userResponse.setSuccess("200", "Available flags", flags);
        return userResponse.send(res);
      }
      userResponse.setSuccess("404", "property not flagged yet");
      return userResponse.send(res);
    }
    userResponse.setError("404", `A property with id ${id} does not exist`);
    return userResponse.send(res);
  }
};
module.exports = propertyController;
