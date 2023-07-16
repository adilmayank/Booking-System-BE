const { UserModel } = require('../Model/User')

class User {
  getAllUsers = async () => {
    try {
      const allUsers = await UserModel.find({})
      return allUsers
    } catch (error) {
      throw error
    }
  }


}

module.exports = User
