const upload = require("../utils/multer");

exports.uploadPhotos = upload.array("photos", 5);
