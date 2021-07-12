const Store = require("../models/Store");

exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addStore = async (req, res, next) => {
  try {
      const store = await Store.create(req.body);
      return res.status(201).json({
        success: true,
        data: store,
      });
  } catch (error) {
    console.log(error);
    if(error.code === 11000) {
        return res.status(400).json({ error: "This store already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
