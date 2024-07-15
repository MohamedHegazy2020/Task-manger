import { categoryModel } from "../../../DB/models/category.model.js";
import { asyncHandler } from "../../../utils/errorhandling.js";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const isCategoryDublicated = await categoryModel.findOne({ name });

  if (isCategoryDublicated) {
    return next(new Error("category is already exist", { cause: 404 }));
  }

  const category = await categoryModel.create({
    name,
    createdBy: req.authUser._id,
  });

  return res.status(201).json({ message: "Done", category });
});



// ========================= get all categories ============



export const getAllCategories = asyncHandler(async(req,res,next)=>{
    const allCategories = await categoryModel.find({createdBy:req.authUser._id})
    return res.status(200).json({message:"Done" , allCategories})
})


// ============== update category  ================
export const updateCategory = asyncHandler(async(req,res,next)=>{
    const {categoryId} = req.params
    const {newName} = req.body
    const category =await categoryModel.findOne({createdBy:req.authUser._id ,_id:categoryId})
    if(!category){
        return next(new Error(`category doesn't exist` ,{cause:404}))
    }

    category.name=newName
    await category.updateOne()
    return res.status(200).json({message:'Done' ,updatedCategory:category})

})

// ================== delete category =====================


export const deleteCategory =asyncHandler(async(req,res,next)=>{
    const {categoryId} = req.params
    const category =await categoryModel.findOne({createdBy:req.authUser._id ,_id:categoryId})
    if(!category){
        return next(new Error(`category doesn't exist` ,{cause:404}))}
     const deleteResult =    await category.deleteOne()
    return res.status(200).json({message:'Done' ,deleteResult})

    }
)