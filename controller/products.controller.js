const { read_file, write_file } = require("../file-manager/fs");
const { v4 } = require("uuid");

///  get

const get_product = async (req, res) => {
  try {
    const file_d = read_file("products.json");
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

    const file_d = read_file("products.json");
    const finded_file = file_d.find((item) => item.id === id);

    if (!finded_file) {
      return res.status(404).json({
        message: " no products left",
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
    const { name, price } = req.body;

    const file_d = read_file("products.json");

    if (!name || !price) {
      return res.status(404).json({
        message: "name , price kiriting",
      });
    }

    file_d.push({
      id: v4(),
      name,
      price,
    });

    write_file("products.json", file_d);
    res.status(201).json({
      message: "products added",
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
    const { name, price } = req.body;
    const { id } = req.params;

    if (!name || !price) {
      return res.status(404).json({
        message: "name , price kiriting",
      });
    }
    const file_d = read_file("products.json");
    const finded_file = file_d.find((item) => item.id === id);

    if (!finded_file) {
      return res.status(404).json({
        message: "no products left",
      });
    }

    file_d.forEach((item) => {
      if (item.id === id) {
        item.name = name ? name : item.name;
        item.price = price ? price : item.price;
      }
    });

    write_file("products.json", file_d);

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

    const file_d = read_file("products.json");
    const finded_file = file_d.find((item) => item.id === id);

    if (!finded_file) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    file_d.forEach((item, index) => {
      if (item.id === id) {
        file_d.splice(index, 1);
      }
    });

    write_file("products.json", file_d);
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