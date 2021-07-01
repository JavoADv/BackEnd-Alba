const router = require('express').Router();
const videosUseCases = require('../usecases/videos');
const authMiddleWares = require('../middlewares/auth');

router.get('/', async (req, res) => {
    try {
        const videos = await videosUseCases.getAll();
        
        res.status(200).json({
            success: true,
            message: 'All videos',
            data: {
                videos
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
        const videos = await videosUseCases.getById(id);
        res.status(200).json({
            success: true,
            message: 'Video by id',
            data: {
                videos
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

router.post('/', authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const newVideo = req.body;

        const createdVideo = await videosUseCases.create(newVideo);
        res.status(200).json({
            success: true,
            message: 'Created video successfully',
            data: {
                videos: createdVideo
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error at create new video',
            data: error.message
        })
    }
})

router.patch('/:id', authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const updatedVideoData = req.body;

        const updatedVideo = await videosUseCases.updateById(id, updatedVideoData);
        res.status(200).json({
            success: true,
            message: 'Updated video successfully',
            data: {
                videos: updatedVideo
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

router.delete('/:id', authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;

        const deletedVideo = await videosUseCases.deleteById(id);
        res.status(200).json({
            success: true,
            message: 'Deleted video successfully',
            data: {
                videos: deletedVideo
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