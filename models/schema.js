let mongoose = require("mongoose");

// main().then((res) => {
//   console.log("connected with altas mongoose");
// });

// async function main() {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://GurpreetDB_9211:92119211@cluster0.35fp2tb.mongodb.net/PortfolioDB",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//   } catch (error) {
//     console.log("cannot connect");
//   }
// }

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas for schema");
  } catch (error) {
    console.log("❌ Cannot connect to MongoDB Atlas for schema", error);
  }
}

// Run the connection
main();
  

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  phoneNum: {
    type: Number,
  },
  msg: {
    type: String,
  },
});

let Userdata = mongoose.model("Userdata", UserSchema);

module.exports = Userdata;
