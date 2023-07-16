const { User } = require('../Service/User')

class User {
  getAllUsers = async (req, res) => {
    try {
      const allUsers = await User.getAllUsers()
      res.status(200).json({ value: allUsers })
    } catch (error) {
      res
        .status(404)
        .json({
          value: null,
          error: true,
          msg: 'Error occurced while fetching user',
        })
    }
  }
}

module.exports = User