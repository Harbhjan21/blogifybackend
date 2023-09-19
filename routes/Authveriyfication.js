const jwt = require("jsonwebtoken");
const S_KEY = "blogify";
const Authverifycation = async (req, res, next) => {
  const token = req.header("token");
  console.log("token", token);
  try {
    if (!token) {
      res.json({ success: false, error: "invalid token" });
    } else {
      jwt.verify(token, S_KEY, (err, data) => {
        if (err) {
          res.json({ success: false, error: "invalid token" });
        } else {
          req.body.userdata = data;
          next();
        }
      });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
};

module.exports = Authverifycation;
