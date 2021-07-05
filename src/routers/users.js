const express = require('express');
const usersUseCases = require('../usecases/users');
const authMiddleWares = require('../middlewares/auth');
const router = express.Router();

// El admin tiene permiso para obtener a los usuarios
router.get('/', authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const { email } = req.query
        let users
        if (email) {
            users = await usersUseCases.getByEmail(email)
            res.status(200).json({
                success: true,
                message: 'User by email',
                data: {
                    users
                }
            })
            return null
        }
        users = await usersUseCases.getAll()
        res.status(200).json({
            success: true,
            messages: 'All users',
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error getting all users',
            data: error.message
        })
    }
})

router.get('/:id', authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params
        const user = await usersUseCases.getById(id); 
        res.status(200).json({
            success: true,
            messages: 'User by id',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error getting userById',
            data: error.message
        })
    }
})

router.get('/profile', async (req, res) => {
    try {
        const { auth } = req.headers;
        if (!auth) {
            res.status(400).json({
                sucess: false,
                message: 'No auth',
                data: null
            })
            return;
        }
        const user = await usersUseCases.getProfile(auth);

        res.status(200).json({
            sucess: true,
            message: 'User found successfully',
            user
        });
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: 'No User found',
            data: null
        });
    }
})

// Los usuarios y el admin pueden darse de alta -> authMiddleWares.hasRole(['admin, user']),
router.post('/signup', async (req, res) => {
    try {
        const { role } = req.body;
        let newUser = req.body;
        if(!role){
            newUser = {
                ...newUser,
                role: 'user'
            }
        }
        const userSignedUp = await usersUseCases.signUp(newUser);
        const token = await usersUseCases.signIn(newUser.email, newUser.password);
        res.status(200).json({
            succes: true,
            message: 'User signed up',
            data: {
                User: userSignedUp,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Could not sign up',
            data: error.message

        })
    }
})

router.post('/signIn', async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await usersUseCases.signIn(email, password)
        res.status(200).json({
            success: true,
            message: 'Signed In',
            data: {
                token
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Could not sign in',
            data: error.message

        })
    }
})

//El admin tiene permiso para actualizar 
router.patch('/:id', authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params
        const dataUpdated = req.body

        const userUpdated = await usersUseCases.updateById(id, dataUpdated)

        res.status(200).json({
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
router.delete('/:id', authMiddleWares.auth, authMiddleWares.hasRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params
        const userDeleted = await usersUseCases.deleteById(id)
        res.status(200).json({
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