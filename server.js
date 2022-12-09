const express = require('express')
const app = express()
const mongoose = require('mongoose')


const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')
const tokenRoutes = require('./routes/resumeTokenRoutes')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/auth', authRoutes )
app.use('/api/resume', resumeRoutes)
app.use('/api/getResume', tokenRoutes)
app.use('/images', express.static('images'));



mongoose.connect('mongodb+srv://marcomongo:mongomarco@marcosclusterno1.kzoqh.mongodb.net/resume?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to the database')
})
.catch((error) => { console.log(error)})


app.listen(process.env.PORT || 5000, ()=>{
console.log('server running')
})