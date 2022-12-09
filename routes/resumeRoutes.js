const express = require('express')
const router = express.Router()
const {getResume, getResStatus, deleteResume, createResume, updateResume} = require('../controllers/resumeController')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const Resume = require('../models/resumeModel')
const Auth = require('../middlewear/requireAuth')
router.use(Auth)


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null,uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    /*const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];*/
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });




router.post('/createPhoto',upload.single('photo'), async(req, res) => {
    const user_id = req.user._id
    const url = req.protocol + '://' + req.get('host')
    const {name,surname,age,talent,layout,country,province,hobbies,skills,education,workExperience,about,token, email ,gender, cell} = req.body
    console.log(req.body)
    const photo = url + '/images/' + req.file.filename;
try{
    const resume = await Resume.create({photo, user_id,name,surname,age,cell,gender,talent,layout,country,province,hobbies,skills,education,workExperience,about,token, email})
    res.status(200).json(resume)
    console.log(resume)
}catch(error){
    res.status(400).json({error : error.message})
    console.log(error)
}
});

router.get('/getResume', getResume)

router.post('/create', createResume)

router.get('/getResStatus', getResStatus)

router.delete('/deleteResume', deleteResume)

router.post('/updateRes', updateResume)


router.put('/updateResPhoto',upload.single('photo'), async(req, res) => {
    const user_id = req.user._id
    const url = req.protocol + '://' + req.get('host')
    const info = req.body
    const photo = url + '/images/' + req.file.filename;
try{
    const resume = await Resume.findByIdAndUpdate(user_id, {info, photo})
    res.status(200).json(resume)
    console.log(resume)
}catch(error){
    res.status(400).json({error : error.message})
    console.log(error)
}
});



module.exports = router



