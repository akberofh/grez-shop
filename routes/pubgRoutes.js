import express from 'express'
import { deleteById, getByIdPubg, getPubg, pubgPost } from '../controllers/pubgController.js'

const router = express.Router()


router.get('/', getPubg)

router.post('/post', pubgPost)

router.get('/:id', getByIdPubg)

router.delete('/:id',deleteById)

router.patch('/:id', (req, res) => {
    //req.params.id
    res.json({msg: 'update metod'})
})

export default router