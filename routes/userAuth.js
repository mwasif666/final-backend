const  express  = require('express')
const router  = express.Router()
const {body  , validationResult} = require('express-validator')
const jwt =  require('jsonwebtoken')
const  JWT_SECRET = "wasifisagoodboy12#"
const bcrypt = require('bcrypt')
const User = require('../models/User')


// Routes:01 for user sign up, status:done ,testing complete
router.post('/signup', [
    body("userName" , "Enter a valid name").isLength({min:3}),
    body("email" , "Enter a valid gmail").isEmail(),
    body("password" , "Enter a valid name").isLength({min:7}),
     
],
async(req , res)=>{
    try {
        const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
        let salt = await bcrypt.genSalt(10)
        const secPass  = await bcrypt.hash(req.body.password , salt)
        const user  =await User.create({
            userName:req.body.userName,
            email:req.body.email,
            password:secPass
        })

        const data  = {
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data , JWT_SECRET)
        res.json({authToken, message:"User Created Successfully", success:true})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error"})       
    }
}
)

module.exports = router;
//ggit ko subha mn dakhta hon