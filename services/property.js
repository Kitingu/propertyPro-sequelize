import db from "../models";

class PropertyServices {
  static async getPropertyByField(field, value) {
    const property = await db.Property.findOne({
      where: { [field]: value }
    });
    if (!property) return null;
    return property.dataValues;
  }
  static async checkDuplicates(address, city, price, ownerPhoneNumber) {
    const property = await db.Property.findAll({
      where: {
        address,
        city,
        price,
        ownerPhoneNumber
      }
    });
    return property;
  }

  static async deleteProperty(id) {
    await db.Property.destroy({
      where: {
        id
      }
    });
  }
}
export default PropertyServices;
