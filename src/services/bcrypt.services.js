const bcrypt = require("bcryptjs");
const { salt } = require("../../config/config.js");

class BcryptService {
  hashPassword = async (password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      return error;
    }
  };

  comparePassword = async (password, newPassword) => {
    try {
      const samePassword = await bcrypt.compare(password, newPassword);
      return samePassword;
    } catch (error) {
      return error;
    }
  };
}

module.exports = new BcryptService();
