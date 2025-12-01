const {read_file, write_file } = require("../file-manager/fs")
const updated_admin = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(404).json({
        message: "role kiriting",
      });
    }

    const searchRole = ["user", "admin"];
    if (!searchRole.includes(role)) {
      return res.status(400).json({
        message: "role ga  admin yoki user mumkin",
      });
    }

    const file_d = read_file("users.json");
    const user = file_d.find((item) => item.id === id);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    if (!user.role) {
      user.role = "user";
    }

    user.role = role;

    write_file("users.json", file_d);
    res.status(200).json({
      message: "updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const get_all = async (req, res) => {
  try {
    const file_d = read_file("users.json");

    res.status(200).json(file_d);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {updated_admin, get_all}
