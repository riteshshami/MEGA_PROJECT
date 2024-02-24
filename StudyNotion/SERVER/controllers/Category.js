const Category = require("../models/Category");
const { findById } = require("../models/RatingAndReview");
function getRandomInt(max){
  return Math.floor(Math.random()*max)
}

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
      success: true,
      message: "Categories received successfully",
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
    const { categoryid } = req.headers;
    // get courses for specified category id
    const selectedCategory = await Category.findById(categoryid)
      .populate({
        path: "course",
        match: {status: "Published"},
        populate: "ratingAndReviews",
      })
      .exec();
      
    // validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    // Handle the case when there are no courses
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryid },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec()

    // get top selling courses
    const allCategories = await Category.find()
      .populate({
        path:"course",
        match:{status : "Published"},
        populate: {
          path: "instructor",
        }
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.course)
    const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10)  

    // return response
    return res.status(200).json({
        success:true,
        data:{
            selectedCategory,
            differentCategory,
            mostSellingCourses,
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
