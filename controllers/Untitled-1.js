

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [photo, setPhoto] = useState('')

    const handleSubmit = async(e) => {
        try{
            const res = await fetch('/api/resume/create',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resume_user.token}`,
                    'Content-Type' : 'multipart/form-data'
                },
                body:{
                        photo,name,surname,age,talent,country,province,hobbies,
                        skills,education,workExperience,about,token,layout,
                        cell,email,gender
                }
            })
              const json = await res.json()
              console.log(json)
        }catch(error){
            console.log(error)
        }
    }


            
        <form>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg "
                name="photo"
                onChange={() => setPhoto(e.target.files[0])}
            />

            <input 
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input 
                type="text"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <button onClick={addInfo}></button>
        </form>






const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

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

router.post('/add',upload.single('photo'), async(req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const {name,surname,age,talent,country,province,hobbies,skills,education,workExperience,about,token} = req.body
    const photo = url + '/images/' + req.file.filename;
try{
    const resume = await Resume.create({photo, user_id,name,surname,age,talent,country,province,hobbies,skills,education,workExperience,about,token})
    res.status(200).json(resume)
    console.log(resume)
}catch(error){
    res.status(400).json({error : error.message})
}
});



router.get('/rec', (req, res)=>{
    const users = User.find()
    .then((users) => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})


app.use(express.json({extended: false}))
app.use('/images', express.static('images'));













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



















const createCv = async (e) =>{
    e.preventDefault()

    if(!name || !surname || !age || !talent || !country ||
        !province || !hobbies || !skills || !education || 
        !workExperience || !about || !layout || !cell || !email || !gender ){
            setError('please enter all fields')
    }

    else{
        const x = name.slice(0,3)
        const y = surname.slice(0,3)
        const token = x+y+111

        const formData = {
            photo:'',name,surname,age,talent,country,province,hobbies,
            skills,education,workExperience,about,token,layout,email,gender,cell
        }
        try{
          setLoading(true)
          setError(false)
          console.log('my data' ,formData.cell)
          const res = await fetch('/api/resume/create',{
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${resume_user.token}`,
                  'Content-Type' : 'application/json'
              },
              body: JSON.stringify(formData)
          })
            const json = await res.json()
            console.log('success', json)
            dispatch({type:'SET_TOKEN', payload: json.token})
            localStorage.setItem('resume_user_token', JSON.stringify(json.token))
            setError(false)
            navigate('/user/dashboard')
      }catch(error){
          console.log(error)
          setError(true)
      }
      finally{
          setLoading(false)
      }
    }
}