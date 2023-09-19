const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the user schema
const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    descreption: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Blog = mongoose.model("BlogifyBlog", BlogSchema);

module.exports = Blog;
