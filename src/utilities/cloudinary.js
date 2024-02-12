
const fs = require('fs')
const cloudinary = require('cloudinary')
cloudinary.config({ 
  cloud_name: "dndfzn6h3",
  api_key: "323761754379937",
  api_secret: "SZLTM894g84d1oA5vYKCVDfj5Pw"
});

const uploadToCloudinary =async(localPath)=>{
    try {
        if(!localPath) return null
        const response = await cloudinary.uploader.upload(localPath , {
            resource_type: "auto"
        })
        fs.unlinkSync(localPath)
        return response 
        
    } catch (error) {
        fs.unlinkSync(localPath)
        return null
    }
}

module.exports = uploadToCloudinary