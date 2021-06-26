const express = require ('express')
const usersUseCases = require ('../usecases/users')

const authMiddleWares = require('../middlewares/auth')

const router = express.Router ()

// router.use(auth)

// El admin tiene permiso para obtener a los usuarios
router.get ('/', authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        console.log('entramos')
        const { email } = req.query 
        let users
        console.log('antes validacion')
        if (email) {
            users = await usersUseCases.getByEmail (email)
            res.status (200).json ({
                success: true,
                message: 'User by email',
                data: {
                    users
                }
            })
            return null
        }
        console.log('despues validacion');
        console.log('antes getall')
        users = await usersUseCases.getAll()
        console.log('truena')
        res.status (200).json ({
            success: true,
            messages: 'All users',
            data: {
                users
            } 
        })
    } catch (error) {
        res.status(400).json ({
            success: false,
            message: 'Error getting all users',
            data: error.message
        })
    }
})

// Los usuarios y el admin pueden darse de alta -> authMiddleWares.hasRole(['admin, user']),
router.post ('/signup',  async (req, res) => {
    try {
        const userSignedUp = await usersUseCases.signUp(req.body)
        res.status (200).json({
            succes: true,
            message: 'User signed up',
            data: {
                User: userSignedUp
            }
        })
    } catch (error) {
        res.status(400).json ({
            success: false,
            message: 'Could not sign up',
            data: error.message

        })
    }
})

// ¿El router de signIn?
//Todos los usuarios pueden entrar 
router.post('/sigin', authMiddleWares.hasRole(['admin, user, partner']), async (req, res)=>{
    try {
        const {email, password} = req.body
        const token = await users.signin(email, password)//login¿?
        res.json ({
            success: true,
            message: 'Signed In',
            data: {
                token
            }
        })

    } catch (error) {
        res.status(400).json ({
            success: false,
            message: 'Could not sign in',
            data: error.message
        
        })
    }
})

//El admin tiene permiso para actualizar 
router.patch ('/:id', authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const {id} = req.params
        const dataUpdated = req.body

        const userUpdated = await usersUseCases.updateById(id, dataUpdated)

        res.status (200).json ({
            success: true,
            message: 'Data updated successfully',
            data: {
                user: userUpdated
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating data',
            data: error.message
        })
    }
})

//El admin tiene permiso para borrar 
router.delete('/:id', authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const {id} = req.params
        const userDeleted = await usersUseCases.deleteById(id)
        res.status (200).json({
            success: true,
            message: 'User deleted successfully',
            data: {
                user: userDeleted
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error deleting user',
            data: error.message
        
    })
    }
})

module.exports = router