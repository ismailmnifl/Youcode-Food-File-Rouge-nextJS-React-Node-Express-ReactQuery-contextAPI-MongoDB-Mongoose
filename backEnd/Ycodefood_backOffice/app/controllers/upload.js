// upload multiple files function

const multer = require('multer');
const path = require('path');

module.exports = {
    
    uploader: (req,res) => {
        try{

            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./static/uploads/");
                },
                filename: function (req, file, cb) {
                    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                }
            });
            const upload = multer({ storage: storage }).array('file', 12);
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err);
                } else if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).send(req.files);
            });
        }catch(err){
            res.send(err); 
        }
    }
}