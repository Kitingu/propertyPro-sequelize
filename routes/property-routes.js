import express from "express";
import propertyController from "../controllers/property";
import {checkAgent} from "../middlewares/agents";
import {upload} from "../middlewares/upload";
import { checkIdType, handlers } from "../middlewares/error-handler";
import jwtHelper from "../middlewares/jwt";
import Validate from "../middlewares/validators";
import checkDuplicates from "../middlewares/check-duplicates";

const { verifyToken } = jwtHelper;
const router = express.Router();
const { methodNotAllowed } = handlers;

router
  .route("/property")
  .post(
    verifyToken,
    upload,
    Validate.property,
    checkAgent,
    checkDuplicates,
    propertyController.createProperty
  )
  .get(propertyController.getAll)
  .all(methodNotAllowed);

router
  .route("/property/:id")
  .get(checkIdType, propertyController.getSpecificAdvert)
  .delete(
    checkIdType,
    verifyToken,
    checkAgent,
    propertyController.deleteProperty
  )
  .all(methodNotAllowed);

router
  .route("/property/:id/price")
  .patch(
    checkIdType,
    verifyToken,
    checkAgent,
    // Validate.priceUpdate,
    propertyController.updatePrice
  )
  .all(methodNotAllowed);

router
  .route("/property/:id/sold")
  .patch(checkIdType, verifyToken, checkAgent, propertyController.changeStatus)
  .all(methodNotAllowed);

router
  .route("/property/:id/flag")
  .patch(
    checkIdType,
    verifyToken,
    Validate.flag,
    propertyController.flagProperty
  )
  .get(propertyController.getFlags)
  .all(methodNotAllowed);

export default router;
