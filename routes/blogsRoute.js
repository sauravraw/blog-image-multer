// Error
const sendResponse = require("../helpers/sendResponse");
const appError = require("../helpers/appError.js");
const sendError = require("../helpers/sendError.js");

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

let storage = multer.diskStorage({
	destination: `./images/`,
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString + file.originalname);
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
		sendError(
			401,
			"Unsuccessful",
			"Error: Only Image should be added",
			req,
			res
		);
	}
}

let upload = multer({ storage });

router.route("/").get(getAllBlogs).post(upload.single("blogImage"), createBlog);

router.route("/:blogId").get(getBlogById).delete(deleteBlogById);

router.route("/").delete(deleteByQuery);
module.exports = router;
