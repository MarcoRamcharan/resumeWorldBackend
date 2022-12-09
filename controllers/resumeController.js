const Resume = require('../models/resumeModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const createResume = async (req, res) => {
    const user_id = req.user._id
    const {cell,photo,name,surname,age,gender,talent,layout,country,province,hobbies,skills,education,workExperience,about,cover,token, email} = req.body
    try{
        const resume = await Resume.create({photo,user_id,name,surname,age,cell,gender,talent,layout,country,province,hobbies,skills,education,workExperience,about,cover,token,email})
        res.status(200).json(resume)
        console.log(resume)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}


const getResume = async (req, res) =>{
    const user_id = req.user._id
    console.log('get resuem hit')
    try{
        const resume = await Resume.findOne({user_id})
        res.status(200).json(resume)
        console.log(resume)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}

const getResStatus = async (req, res) =>{
    const user_id = req.user._id
    try{
        const resume = await Resume.findOne({user_id})
        if(resume){
            res.status(200).json(true)
        }
        if(!resume){
            res.status(200).json(false)
        }
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//delete a word
const deleteResume = async (req, res) =>{
    console.log('delete resume route hit')
    const user_id = req.user._id
    try{
        const deletedResume = await Resume.findOneAndDelete({user_id: user_id})
        if(deletedResume){
            console.log('resuem deleted')
            res.status(200).json(true)
        }
        if(!deletedResume){
            res.status(200).json(false)
        }
    }catch(error){

        console.log(error)
        res.status(400).json({error: error.message})

    }
}



const updateResume = async (req, res) =>{
    console.log('update resume hit')
    const user_id = req.user._id
    const {id, cell,photo,name,surname,age,gender,talent,layout,country,province,hobbies,skills,education,workExperience,about,cover,token, email} = req.body
    console.log('the about', about)
    try{
     const resume = await Resume.findByIdAndUpdate(id,{photo,user_id,name,surname,age,cell,gender,talent,layout,country,province,hobbies,skills,education,workExperience,about,cover,token,email})
        res.status(200).json(resume)
        console.log('updated resume', resume)
    }catch(error){
        console.log(error)
        res.status(400).json({error : error.message})
    }
}













module.exports = {
    createResume,
    getResume,
    getResStatus,
    deleteResume,
    updateResume
}