const jwt = require('../lib/jwt')
const users = require('../usecases/users')

function auth(req, res, next) {
    try {
        const { auth: token } = req.headers
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

function hasRole(allowedRoles) {
    return async (req, res, next) => {
        try {
            const { auth: token } = req.headers

            const validToken = jwt.verify(token)
            if (!validToken) {
                throw new Error('Not authorized')
            }

            const userFound = await users.getById(validToken.id)
            const userRoles = userFound.role || []

            const allowedRole = userRoles.find(userRole => {
                return allowedRoles.find(allowedRole => userRole === allowedRole)
            })

            if (!allowedRole) {
                throw new Error('Not permited')
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
}

module.exports = {
    auth,
    hasRole
}