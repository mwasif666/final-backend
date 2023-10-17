const express = require('express')
const app = express()
const port  = 3000
const connectToMongo = require('./db')

connectToMongo()
// * express.json is a middleware function in express which help parse the incoming request with json payload and it is based on body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/auth', require('./routes/userAuth'))

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})