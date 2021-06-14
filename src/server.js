const express = require ('express')
const app = express()

const routersCourses = require('./routers/courses');
const routersVideos = require('./routers/videos');
const routersCategories = require('./routers/categories');

app.use(express.json());
app.use('/courses', routersCourses);
app.use('/videos', routersVideos);
app.use('/categories', routersCategories);

app.get('/', (req,res)=> {
    res.status(200).json({
        success: true,
        message: 'Default root',
        data: null
    })
})

module.exports = app