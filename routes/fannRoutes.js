import express from 'express'
import { deleteById, getByIdFann, getFann, fannPost } from '../controllers/fannController.js'
import { adminControlAuth } from '../middleware/authMiddleware.js'


const router = express.Router()


router.get('/', getFann)

router.post('/post', adminControlAuth, fannPost)

router.get('/:id', getByIdFann)

router.delete('/:id', adminControlAuth,deleteById)

router.patch('/:id', (req, res) => {
    //req.params.id
    res.json({msg: 'update metod'})
})

export default router