const express = require('express')
const cors = require('cors');

const app = express()

const routersCourses = require('./routers/courses');
const routersVideos = require('./routers/videos');
const routersCategories = require('./routers/categories');
const routersStripe = require('./routers/stripe');

app.use(cors())
app.use(express.json());
app.use('/stripe', routersStripe);
app.use('/courses', routersCourses);
app.use('/videos', routersVideos);
app.use('/categories', routersCategories);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Default root',
        data: null
    })
})

module.exports = app