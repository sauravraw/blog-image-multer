const mongoose = require("mongoose");

async function relatedBlogHandler() {
	return await mongoose.model("ImageDatabase").exists({
		blogId: this.relatedBlogId,
	});
}

module.exports = relatedBlogHandler;
