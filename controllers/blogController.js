const sendResponse = require("../helpers/sendResponse");
const sendError = require("../helpers/sendError.js");
const Blog = require("../models/blogSchema.js");
const upload = require("../helpers/blogImageMulter.js");

const getAllBlogs = async (req, res) => {
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
		sendError(401, "Cannot get Blog by given Id", err, req, res);
	}
};

const createBlog = async (req, res) => {
	const { blogTitle, blogContent } = req.body;
	let blogRelatedData = JSON.parse(req.body.blogRelatedLinks);
	console.log(req.body);
	console.log(req.file);
	let newBlog;

	blogRelatedData.forEach(() => {
		newBlog = new Blog({
			blogTitle,
			blogContent,
			blogRelatedLinks: blogRelatedData,
			blogImage: req.file.path,
		});
	});
	try {
		newBlog = await newBlog.save();
		sendResponse(200, "Successful", newBlog, req, res);
	} catch (err) {
		sendError(401, "Unsuccessful", err, req, res);
	}
};

const updateBlogs = async (req, res) => {
	const { blogId } = req.params;
	const re = /<("[^"]?"|'[^']?'|[^'">])*>/;

	if (re.test(req.params.blogTitle)) {
		sendError(400, "Unsuccessful", "Blog Title cannot be HTML", req, res);
	} else {
		try {
			let update = {};
			if (req.body.blogTitle) update.blogTitle = req.body.blogTitle;
			if (req.body.blogContent) update.blogContent = req.body.blogContent;
			let blog = await Blog.updateOne(
				{ blogId },
				{
					$set: update,
				},
				{ runValidators: true }
			);
			sendResponse(200, "Successfull", blog, req, res);
		} catch (err) {
			sendError(400, "Blog can't be updated by given id", err, req, res);
		}
	}
};

const deleteBlogById = async (req, res) => {
	const { blogId } = req.params;
	try {
		let deletedBlog = await Blog.deleteOne({ blogId });
		sendResponse(200, "Blog Deleted Successfully", deletedBlog, req, res);
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
	updateBlogs,
	deleteBlogById,
	deleteByQuery,
};
