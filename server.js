let express = require("express");
let app = express();
let cors = require("cors");

let userFormData = require("./models/schema.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get("/forms", (req, res) => {
  userFormData
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));

  console.log("hellow");
});

app.listen(8080, () => {
  console.log("listning on 8080 ...");
});
