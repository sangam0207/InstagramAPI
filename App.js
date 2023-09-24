const express = require('express');
const fs=require('fs')
const hbs = require('hbs');
const path = require('path');
const app = express();
const sangamDataPromise = require('./API/sangam.js');
const bcrypt=require('bcrypt');
const InstaUser = require('./src/module/instaUser.js');
require("./src/db/conn.js");



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Register Handlebars as the template engine
app.set('view engine', 'hbs');
console.log(__dirname);
app.set('views', path.join(`${__dirname}/template/view`));

app.get("/", (req, res) => {
    res.render("register");
  });
app.post("/", async (req, res) => {
  
  
    try {
      const password = req.body.password;
      const cpassword = req.body.confirm_password;
      if (password === cpassword) {
        console.log(password, cpassword);
        const newUser = new InstaUser ({
          email: req.body.email,
          password: password,
          confirm_password: cpassword,
        });
  
        /// Middleware
        const result = await newUser.save();
       
        res.render("login");
      } else {
        res.render("errorpage");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  app.get("/login", (req, res) => {
    res.render("login");
  });
  app.post("/login", async (req, res) => {
    try {
      const email = req.body.email;
      console.log(email)
      const password = req.body.password;
      const findUser = await InstaUser.find({ email: email});
      console.log(findUser[0].password, password);
      const isMatch= await bcrypt.compare(password,findUser[0].password )
      console.log(isMatch);
      if (isMatch) {
       
        res.render( 'input');
    }
    

 else {
        res.render("loginError");
      }
    } catch (error) {
      res.send("invalid email or Password");
    }
  });
  app.get("/input",(req,res)=>{
    res.render("input");
  })
  app.post('/input',async (req,res)=>{
    try{
        const dataName=req.body.username;
    console.log(dataName);
    fs.writeFileSync('name.txt',dataName,(err)=>{
            console.log("thiere is error");
    })
    sangamDataPromise
    .then((sangamData) => {
      const userData = {
        fullName: sangamData.fullName,
        username: sangamData.username,
        followers: sangamData.followers,
        following: sangamData.following,
        averageLikes: sangamData.postDataAvgLikes,
         
        images: sangamData.images,
      };
      res.render('profile', userData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred.');
    });
    }catch(error){
        console.log(error);
    }
  })


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});