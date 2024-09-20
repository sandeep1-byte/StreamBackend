import express from 'express';
import {createCategory,getAllCategories,getCategoryById,updateCategoryById,deleteCategoryById,} from '../Controller/videocategory.controller';

const router = express.Router();

router.post('/create', createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);

export default router;
