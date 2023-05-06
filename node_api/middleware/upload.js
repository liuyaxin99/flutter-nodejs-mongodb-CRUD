const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    //cd:callback
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const fileFilter = (req, file, callback) => {
    //check extention
    const acceptableExtensions = [".png", ".jpg", ".jpeg"];
    if (!acceptableExtensions.includes(path.extname(file.originalname))) {
        return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }

    //check file size
    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 1048576) {
        return callback(new Error("File Size is Big"));
    }

    callback(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    fileSize: 1048576, // 10 Mb
});

//upload single file
module.exports = upload.single("productImage");