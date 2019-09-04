import db from "../models";

class FlagServices {
  static async findById(propertyId) {
    const flag = await db.Flags.findOne({
      where: { propertyId }
    });
    if (!flag) return null;
    return flag.dataValues;
  }
}
export default FlagServices;
