const Resume = require('../models/resumeModel')
const mongoose = require('mongoose')



//get single
const getResumeToken = async (req, res) =>{
    console.log(req.params)
    const token = req.params.token
    console.log(token)
    try{
        const resume = await Resume.findOne({token})
        if(!resume){
            return res.status(200).json(false)
        }
        res.status(200).json(resume)
        console.log('the reusme',resume)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    getResumeToken
}


