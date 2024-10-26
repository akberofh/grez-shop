import express from 'express'
import { deleteById, getByIdTiktok, getTiktok, tiktokPost, tiktokUpdateProfil } from '../controllers/tiktokController.js'
import upload from '../middleware/uploadMiddleware.js';


const router = express.Router()


router.get('/', getTiktok)

router.post('/postt', upload.single('photo'), tiktokPost)

router.get('/:id', getByIdTiktok)

router.delete('/:id', deleteById)

router.put('/postt/:id', upload.single('photo'), tiktokUpdateProfil);
router.patch('/:id', (req, res) => {
    
    res.json({msg: 'update metod'})
})

export default router