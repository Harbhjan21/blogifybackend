const routes = require("express").Router();
const User = require("../Schema/Auth");

const Authverifycation = require("./Authveriyfication");

const Blog = require("../Schema/Blogs");

const S_KEY = "blogify";

routes.post("/create", Authverifycation, async (req, res) => {
  try {
    const { title, descreption, content, public, userdata } = req.body;
    const { user } = userdata;

    const blog = new Blog({
      title,
      descreption,
      content,
      public,
      userId: user.id,
    });
    await blog.save();

    if (blog.public) {
      await User.findByIdAndUpdate(
        user.id,
        { $push: { blogs: blog._id }, $inc: { public: 1 } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        user.id,
        { $push: { blogs: blog._id }, $inc: { private: 1 } },
        { new: true }
      );
    }

    console.log("blog", blog);
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, error });
  }
});
routes.post("/update", Authverifycation, async (req, res) => {
  try {
    const { title, descreption, content, public, id, userdata } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, descreption, content, public },
      { new: true }
    );
    console.log("updateblog", blog);
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, error });
  }
});
routes.get("/userblogs", Authverifycation, async (req, res) => {
  try {
    const { userdata } = req.body;

    const blog = await Blog.find({ userId: userdata.user.id });
    console.log("userblog", blog);
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, error });
  }
});
routes.post("/getBlog", Authverifycation, async (req, res) => {
  try {
    const { userdata, id } = req.body;

    const blog = await Blog.findById(id);
    console.log("userblog", blog);
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, error });
  }
});
routes.get("/allBlogs", async (req, res) => {
  try {
    const blog = await Blog.find({ public: true }).sort({ createdAt: -1 });
    console.log("allblogs", blog);
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, error });
  }
});
routes.post("/delete", Authverifycation, async (req, res) => {
  try {
    const { userdata, id } = req.body;

    const blog = await Blog.findByIdAndRemove(id, {
      new: true,
    });

    await User.findByIdAndUpdate(
      userdata.user.id,
      {
        $pull: { blogs: blog._id },
        $inc: { [blog.public ? "public" : "private"]: -1 },
      },
      {
        new: true,
      }
    );

    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, error });
  }
});
module.exports = routes;
