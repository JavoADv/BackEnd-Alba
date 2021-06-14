const router = require('express').Router();
const categoriesUseCases = require('../usecases/categories');

router.get('/', async (req, res) => {
    try {

        const { title } = req.query;
        let categories;
        if (title) {
            categories = await categoriesUseCases.getByTitle(title);
            res.status(200).json({
                success: true,
                message: 'Category by title',
                data: {
                    categories
                }
            })
            return null;
        }

        categories = await categoriesUseCases.getAll();
        res.status(200).json({
            success: true,
            message: 'All categories',
            data: {
                categories
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error at getAll',
            data: error.message
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const categories = await categoriesUseCases.getById(id);
        res.status(200).json({
            success: true,
            message: 'Category by id',
            data: {
                categories
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error at getById',
            data: error.message
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const newCategory = req.body;

        const createdCategory = await categoriesUseCases.create(newCategory);
        res.status(200).json({
            success: true,
            message: 'Created category successfully',
            data: {
                categories: createdCategory
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error at create new category',
            data: error.message
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategoryData = req.body;

        const updatedCategory = await categoriesUseCases.updateById(id, updatedCategoryData);
        res.status(200).json({
            success: true,
            message: 'Updated category successfully',
            data: {
                categories: updatedCategory
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error at updateById',
            data: error.message
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await categoriesUseCases.deleteById(id);
        res.status(200).json({
            success: true,
            message: 'Deleted category successfully',
            data: {
                categories: deletedCategory
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error at deleteById',
            data: error.message
        })
    }
})

module.exports = router;