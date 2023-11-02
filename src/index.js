// var http = require("http");

// //create a server object:
// http
//   .createServer(function(req, res) {
//     res.write("Hello World!"); //write a response to the client
//     res.end(); //end the response
//   })
//   .listen(8080); //the server object listens on port 8080
const path = require("path");
const express = require('express');
const multer = require("multer");

const app = express();
const PORT = 8080;
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
    return cb(null, "./uploads");
   },
   filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
   },

});
const upload = multer({storage});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get("/", (req,res)=>{
  return res.render("homepage");
});
app.post('/upload',upload.single("profileImage"), (req,res)=>{
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});
app.listen(PORT,()=>console.log(`server Started at PORT:8080`))