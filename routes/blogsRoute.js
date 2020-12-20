// Error
const path = require("path");
const upload = require("../helpers/blogImageMulter.js");

// File Require
const router = require("express").Router();
const {
	getAllBlogs,
	getBlogById,
	createBlog,
	updateBlogs,
	deleteBlogById,
	deleteByQuery,
} = require("../controllers/blogController.js");

const { response } = require("express");

router.route("/").post(upload);

router.route("/").get(getAllBlogs).post(createBlog);

router
	.route("/:blogId")
	.get(getBlogById)
	.put(updateBlogs)
	.post(upload)
	.delete(deleteBlogById);

router.route("/").delete(deleteByQuery);
module.exports = router;
