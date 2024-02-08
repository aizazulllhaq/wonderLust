const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wonderLust_DEV',
        allowedFormats: ["png", "jpg", "jpeg"],
        // filename: (req, file, callback) => {
        //     // const name = file.originalname.split(' ').join('_');
        //     callback(undefined, new Date().toString + '-' + file.originalname);
        // }
    }
});


module.exports = {
    cloudinary,
    storage
}

