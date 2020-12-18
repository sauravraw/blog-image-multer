const mongoose = require("mongoose");
const uniqid = require("uniqid");

// const blogRelatedLinksSchema = new mongoose.Schema({
// 	title: {
// 		type: String,
// 	},
// 	id: {
// 		type: String,
// 	},
// });

// const blogRelatedLinks = mongoose.model(
// 	"blogRelatedLinksSchema",
// 	blogRelatedLinksSchema
// );
const blogSchema = new mongoose.Schema(
	{
		blogId: {
			type: String,
			default: uniqid(),
			unique: true,
		},
		blogTitle: {
			type: String,
			required: true,
		},
		blogContent: {
			type: String,
			required: true,
		},
		blogImage: {
			type: String,
			required: true,
		},
		// blogRelatedLinks: [{ ref: "blogRelatedLinks" }],
		blogRelatedLinks: [
			{
				relatedBlogId: {
					type: String,
					required: true,
				},
				relatedBlogTitle: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model("ImageDatabase", blogSchema);

module.exports = Blog;
