import express from 'express'
import { deleteById, getByIdTiktok, getTiktok, tiktokPost } from '../controllers/tiktokController.js'
import { adminControlAuth } from '../middleware/authMiddleware.js'


const router = express.Router()


router.get('/', getTiktok)

router.post('/post', adminControlAuth,tiktokPost)

router.get('/:id', getByIdTiktok)

router.delete('/:id', adminControlAuth,deleteById)

router.patch('/:id', (req, res) => {
    //req.params.id
    res.json({msg: 'update metod'})
})

export default router