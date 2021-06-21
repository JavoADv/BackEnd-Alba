const jwt = require ('../lib/jwt')

function auth (req, res, next) {
   try {
    const {auth: token } = req.headers
    // console.log('token: ', token)
    const validToken = jwt.verify(token)
    if (!validToken) {
        throw new Error('Not authorized')
    }
    next()
   } catch (error) {
       res.status(401)
       res.json({
           success: false,
           message: 'Not authorized',
           error: error.message,
       })
       
   }
}

module.exports = auth