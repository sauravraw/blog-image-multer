const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
	destination: "./images",
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + path.extname(file.originalname));
	},
});

// init upload
let upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single("blogImage");

// to Check File TYpe
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// check ext
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	// check mime type
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb("Error: Images Only");
	}
}

module.exports = upload;
