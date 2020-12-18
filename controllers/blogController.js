const sendResponse = require("../helpers/sendResponse");
const appError = require("../helpers/appError.js");
const sendError = require("../helpers/sendError.js");
const Blog = require("../models/blogSchema.js");

const getAllBlogs = async (req, res, next) => {
	if (req.query) {
		let findBlog = await Blog.find(req.query);
		if (findBlog < 1) {
			sendError(
				404,
				"Unsuccessful",
				"Blog can't be found try with another query",
				req,
				res
			);
		} else {
			sendResponse(200, "Successful", findBlog, req, res);
		}
	} else {
		const allBlogs = await Blog.find();
		sendResponse(200, "Successful", allBlogs, req, res);
	}
};

const getBlogById = async (req, res) => {
	const { blogId } = req.params;
	try {
		let blog = await Blog.find({ blogId });
		sendResponse(200, "Successful", blog, req, res);
	} catch (err) {
		sendResponse(401, "Cannot get Blog by given Id", err, req, res);
	}
	// console.log(blogId);
	// console.log(req.params);
};

const createBlog = async (req, res, next) => {
	const { blogTitle, blogContent } = req.body;
	let newBlog = new Blog({ blogTitle, blogContent, blogImage: req.file.path });
	try {
		newBlog = await newBlog.save();
		sendResponse(200, "Successful", newBlog, req, res);
	} catch (err) {
		sendError(401, "Unsuccessful", err, req, res);
	}
};

const deleteBlogById = async (req, res) => {
	const { blogId } = req.params;
	try {
		let deletedBlog = await Blog.deleteOne({ blogId });
		sendResponse(200, "Blog Deleted Successfull", deletedBlog, req, res);
	} catch (err) {
		sendError(400, "Blog can't be deleted...", err, req, res);
	}
};

const deleteByQuery = async (req, res) => {
	if (req.query) {
		let deletedBlog = await Blog.deleteMany(req.query);
		sendResponse(
			200,
			"Blog Deleted Successfully by Query Parameter",
			deletedBlog,
			req,
			res
		);
	} else {
		sendError(404, "Unsuccessful", "Blog cannot be deleted", req, res);
	}
};

module.exports = {
	getAllBlogs,
	getBlogById,
	createBlog,
	deleteBlogById,
	deleteByQuery,
};
