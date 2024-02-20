const ProductInsertModel = require("../models/ProductInsertModel");
const productDisplayController = async (req, res) => {
  try {
    const data = await ProductInsertModel.find({ deletedAt: null });
    console.log("data = ", data);
  } catch (error) {
    return res.json({ status: 500, message: "intrenal server error" });
  }
};
module.exports = { productDisplayController };
