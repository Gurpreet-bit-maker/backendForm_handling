let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();
let app = express();
let cors = require("cors");

let userFormData = require("./models/schema.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//heloo updated

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.log("❌ Cannot connect to MongoDB Atlas", error);
  }
}

// Run the connection
main();

app.post("/forms/post", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNum, msg } = req.body;

    // MongoDB me store karo
    const newData = await userFormData.create({
      firstName,
      lastName,
      email,
      phoneNum,
      msg,
    });

    console.log("correctly stored", newData);

    // Frontend ko response bhejo
    res.status(201).json(newData);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to store data" });
  }
});


app.get("/forms/get", (req, res) => {
  userFormData
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err))
  // res.send("hello");
  
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
