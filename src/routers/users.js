const express = require ('express')
const usersUseCases = require ('../usecases/users')

const router = express.Router ()

router.get ('/', async (req, res) => {
    try {
        
        const users = await usersUseCases.getAll()

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

router.get ('/', async (req, res) => { // ¿('/:emal')?
    try {
        const { email } = req.query
        const usersByEmail = await usersUseCases.getByEmail(email)
        res.status (200).json ({
            success: true,
            messages: 'User by email',
            data: {
                usersByEmail 
            }
        })
        
    } catch (error) {
        res.status(400).json ({
            success: false,
            message: 'Error getting users by email',
            data: error.message
    })
}
})

router.post ('/', async (req, res) => {
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
            message: 'Error getting users by email',
            data: error.message

        })
    }
})

// ¿El router de signIn?

router.patch ('/:id', async (req, res) => {
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

router.delete('/', async (req, res) => {
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