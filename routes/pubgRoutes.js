import express from 'express'
import { deleteById, getByIdPubg, getPubg, pubgPost } from '../controllers/pubgController.js'
import { adminControlAuth,  } from '../middleware/authMiddleware.js'

const router = express.Router()


router.get('/', getPubg)

router.post('/post', adminControlAuth,  pubgPost)

router.get('/:id', getByIdPubg)

router.delete('/:id', adminControlAuth, deleteById)

router.patch('/:id', (req, res) => {
    //req.params.id
    res.json({msg: 'update metod'})
})

export default router