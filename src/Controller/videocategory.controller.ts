import { Request, Response } from 'express';
import Category from '../Model/videocategory.model';

// Create new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryname } = req.body;


    // Create a new Category instance
    const newCategory = new Category({
      categoryname,
    });

    // Save the category to the database
    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error:any) {
    console.error('Error while creating category:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update category by ID
export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete category by ID
export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
