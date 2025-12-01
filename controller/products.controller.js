const { read_file, write_file } = require("../file-manager/fs");
const { v4 } = require("uuid");

///  get

const get_product = async (req, res) => {
  try {
    const file_d = read_file("drinks.json");
    res.status(200).json(file_d);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get one

const one_product = async (req, res) => {
  try {
    const { id } = req.params;

    const file_d = read_file("drinks.json");
    const finded_file = file_d.find((item) => item.id === id);

    if (!finded_file) {
      return res.status(404).json({
        message: " no drinks left",
      });
    }
    res.status(200).json(finded_file);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const product_post = async (req, res) => {
  try {
    const { name, size } = req.body;

    const file_d = read_file("drinks.json");

    if (!name || !size) {
      return res.status(404).json({
        message: "name , size kiriting",
      });
    }

    file_d.push({
      id: v4(),
      name,
      size,
    });

    write_file("drinks.json", file_d);
    res.status(201).json({
      message: "drinks added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// PUT

const put_product = async (req, res) => {
  try {
    const { name, size } = req.body;
    const { id } = req.params;

    if (!name || !size) {
      return res.status(404).json({
        message: "name , size kiriting",
      });
    }
    const file_d = read_file("drinks.json");
    const finded_file = file_d.find((item) => item.id === id);

    if (!finded_file) {
      return res.status(404).json({
        message: "no drinks left",
      });
    }

    file_d.forEach((item) => {
      if (item.id === id) {
        item.name = name ? name : item.name;
        item.size = size ? size : item.size;
      }
    });

    write_file("drinks.json", file_d);

    res.status(201).json({
      message: "updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//  delete

const delete_pd = async (req, res) => {
  try {
    const { id } = req.params;

    const file_d = read_file("drinks.json");
    const finded_file = file_d.find((item) => item.id === id);

    if (!finded_file) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    file_d.forEach((item, index) => {
      if (item.id === id) {
        file_d.splice(index, 1);
      }
    });

    write_file("drinks.json", file_d);
    res.status(200).json({
      message: "deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports= {
    get_product,
    one_product,
    product_post,
    put_product,
    delete_pd
}