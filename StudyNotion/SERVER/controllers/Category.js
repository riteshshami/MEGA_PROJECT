const Category = require("../models/Category");
const { findById } = require("../models/RatingAndReview");

// creatTag handler function

exports.createCategory = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;
    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fiels are required",
      });
    }
    // create entry in db
    const CategoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategoryDetails);

    // return response
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all category
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      success: false,
      message: error.message,
      allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Category Details
exports.categoryPageDetails = async (req, res) => {
  try {
    // get categoryId
    const { categoryId } = req.body;
    // get courses for specified category id
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    // validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
    // get courses for different category
    const differentCategories = await findById({ _id: { $ne: categoryId } })
                                                .populate("courses")
                                                .exec();

    // get top selling courses
    // HW: write it on your own

    // return response
    return res.status(200).json({
        success:true,
        data:{
            selectedCategory,
            differentCategories,
        },
    });
  } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
        });
  }
};
