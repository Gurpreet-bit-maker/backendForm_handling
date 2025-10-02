let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();
let app = express();
let cors = require("cors");

let userFormData = require("./models/schema.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.log("❌ Cannot connect to MongoDB Atlas", error);
  }
}

// Run the connection
main();

app.post("/forms/post", (req, res) => {
  let { firstName, lastName, email, phoneNum, msg } = req.body;

  userFormData
    .create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNum: phoneNum,
      msg: msg,
    })
    .then((res) => {
      console.log("correct stored", res);
    });

  console.log(req.body);
});

app.get("/forms/get", (req, res) => {
  userFormData
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
  res.send("hello");
  console.log("hellow");
});

app.get("/", (req, res) => {
  res.send("hello i am working..");
});

// app.listen(8080, () => {
//   console.log("listning on 8080 ...");
// });
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
