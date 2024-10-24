import express from 'express'
import { deleteById, getByIdTiktok, getTiktok, tiktokPost } from '../controllers/tiktokController.js'


const router = express.Router()


router.get('/', getTiktok)

router.post('/post', tiktokPost)

router.get('/:id', getByIdTiktok)

router.delete('/:id', deleteById)

router.patch('/:id', (req, res) => {
    
    res.json({msg: 'update metod'})
})

export default router