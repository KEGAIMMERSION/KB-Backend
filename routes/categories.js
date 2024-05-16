const categoriesRouter = require('express').Router() 
const {checkAuth} = require("../middlewares/auth")
const {findAllCategories, createCategory, findCategoryById, updateCategory,deleteCategory, checkIsCategoryExists, checkEmptyName} = require('../middlewares/categories')
const {sendCategoryCreated, sendAllCategories, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted}  = require("../controllers/categories")
  
 
categoriesRouter.get('/categories', findAllCategories, sendAllCategories)
categoriesRouter.post('/categories', findAllCategories, checkIsCategoryExists, checkEmptyName, checkAuth, createCategory, sendCategoryCreated ) 
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById )
categoriesRouter.put("/categories/:id", checkEmptyName, checkAuth, updateCategory, sendCategoryUpdated)
categoriesRouter.delete("/categories/:id", checkAuth, deleteCategory, sendCategoryDeleted)

module.exports = categoriesRouter