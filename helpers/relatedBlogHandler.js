const mongoose = require("mongoose");

async function relatedBlogHandler() {
	return await mongoose.model("Blog").exists({
		blogId: this.relatedBlogId,
	});
}

module.exports = relatedBlogHandler;
