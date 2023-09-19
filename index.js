const app = require("express")();
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://Harbhjan:Harbhjan@cluster0.tztiudx.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/auth", require("./routes/Authentication"));
app.use("/blogs", require("./routes/Blogs"));

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((err) => {
    if (!err) console.log("mongodb connected");
  });

app.listen(5000, (err) => {
  if (!err) {
    console.log("server is listening at 5000");
  }
});
