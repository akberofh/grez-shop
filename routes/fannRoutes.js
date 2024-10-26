import express from 'express'
import { deleteById, getByIdFann, getFann, fannPost } from '../controllers/fannController.js'
import upload from '../middleware/uploadMiddleware.js'


const router = express.Router()


router.get('/', getFann)

router.post('/postt',   upload.single('photo'),fannPost)

router.get('/:id', getByIdFann)

router.delete('/:id', deleteById)

router.patch('/:id', (req, res) => {
    //req.params.id
    res.json({msg: 'update metod'})
})

export default router