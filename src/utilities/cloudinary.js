const cloudinary = require('cloudinary')
cloudinary.config({ 
  cloud_name: '', 
  api_key: '', 
  api_secret: '' 
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