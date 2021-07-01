const router = require('express').Router();
const coursesUseCases = require('../usecases/courses');
const authMiddleWares = require('../middlewares/auth');

router.get('/', async (req, res) => {
    try {

        const { categoryId } = req.query;
        let courses;
        if (categoryId) {
            courses = await coursesUseCases.getByCategory(categoryId);
            res.status(200).json({
                success: true,
                message: 'Course by category id',
                data: {
                    courses
                }
            })
            return null;
        }

        courses = await coursesUseCases.getAll();
        res.status(200).json({
            success: true,
            message: 'All courses',
            data: {
                courses
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
        const courses = await coursesUseCases.getById(id);
        res.status(200).json({
            success: true,
            message: 'Course by id',
            data: {
                courses
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

router.post('/',authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const newCourse = req.body;

        const createdCourse = await coursesUseCases.create(newCourse);
        res.status(200).json({
            success: true,
            message: 'Created course successfully',
            data: {
                courses: createdCourse
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error at create new course',
            data: error.message
        })
    }
})

router.patch('/:id',authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourseData = req.body;

        const updatedCourse = await coursesUseCases.updateById(id, updatedCourseData);
        res.status(200).json({
            success: true,
            message: 'Updated course successfully',
            data: {
                courses: updatedCourse
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

router.delete('/:id',authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCourse = await coursesUseCases.deleteById(id);
        res.status(200).json({
            success: true,
            message: 'Deleted course successfully',
            data: {
                courses: deletedCourse
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