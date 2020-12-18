// Error
const path = require("path");

// File Require
const router = require("express").Router();
const {
	getAllBlogs,
	getBlogById,
	createBlog,
	deleteBlogById,
	deleteByQuery,
} = require("../controllers/blogController.js");

// multer
const multer = require("multer");
const { response } = require("express");

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
});

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

router.route("/").post(upload.single("blogImage"), createBlog);

router.route("/").get(getAllBlogs);

router.route("/:blogId").get(getBlogById).delete(deleteBlogById);

router.route("/").delete(deleteByQuery);
module.exports = router;
