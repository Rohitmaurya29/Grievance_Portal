const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "Your-secret-key";

router.use(cors());

// to open file on click on table 
router.use("/uploads", express.static(path.join(__dirname, '../uploads'),{
  setHeaders:(res,path)=>{
    console.log(`Serving file from: ${path}`)
  }
}))

mongoose.connect("mongodb://localhost:27017/itAc");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  mob: String,
  adhaar: String,
  gender: String,
  mobile: String,
  age: String,
  file: String,
  review: String,
  registrationNumber: String,
  AdminFile: String,
  resolved: { type: Boolean, default: false } 
});

const model = mongoose.model("itmodel", schema);

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });


router.post("/", upload.single('file'), (req, res) => {
  const { name, email, mob, adhaar, gender, mobile, age } = req.body;
  
  
  console.log("File received: ", req.file); 
  
  const file = req.file ? `/uploads/${req.file.filename.replace(/\\/g, '/')}` : ""; 
  
  const inputData = new model({
    name: name,
    email: email,
    mob: mob,
    adhaar: adhaar,
    gender: gender,
    mobile: mobile,
    age: age,
    file: file 
  });

  inputData.save()
    .then((savedData) => {
      res.json(savedData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/display',(req,res)=>{
  // const {name,email,mob,adhaar,gender,age,file}= req.params;
  model.find({}).then((response)=>{
    res.status(200).json(response);
  }).catch((err)=>{
    res.json(err);
  })
})

router.get("/:id", (req, res) => {
  const id = req.params.id;
  model.findById(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/adminLogin",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  if(password=="admin@123" && username=="admin29"){
    return res.status(200).json({message:"login Successful", username});
  }else{
    return res.status(401).json({message:"Not an admin"})
  }
})

router.delete("/delete/:id", (req,res)=>{
  const id = req.params.id;
  model.findByIdAndDelete({_id:id}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

router.put("/update/:id", upload.single('AdminFile'), (req, res) => {
  const id = req.params.id; 

  console.log("Uploaded AdminFile: ", req.file); 

  
  let updateData = {
      review: req.body.review,  
      registrationNumber: req.body.registrationNumber || id 
  };

  
  if (req.file) {
      updateData.AdminFile = req.file.path; 
  }

  
  model.findByIdAndUpdate(id, updateData, { new: true })
      .then((data) => {
          if (!data) {
              return res.status(404).json({ message: "No entry found with this ID." });
          }
          res.json(data); 
      })
      .catch((err) => {
          console.error(err); 
          res.status(500).json({ message: "Error updating document", error: err }); 
      });
});




router.get("/display/:id", (req,res)=>{
  const id = req.params.id;
  model.findById({_id:id}).then((response)=>{
    res.json(response);
  }).catch((err)=>{
    res.json(err);
  })
})

router.post('/status',(req,res)=>{
  const number = req.body.number;
  model.findOne({mob:number}).then((data)=>{
    if(!data){
      return res.status(404).json({message:"First Register Yourself"})
    }
    else{
      return res.status(200).json({message:"Login Successful", user:data})
    }
  })
})


// Route to get user data based on mobile number
router.get("/displayStatus/:number", (req, res) => {
  console.log("Fetching data for number:", req.params.number); // Add this line to see if the route is hit
  const { number } = req.params;

  model.findOne({ mob: number })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "No data found for this mobile number" });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});

router.post("/resolve", (req, res) => {
  const { id } = req.body;
  model.findByIdAndUpdate(id, { resolved: true }, { new: true }).then((updateGrievance)=>{
    if(!updateGrievance){
      return res.status(404).json({message:"No grievance fornd with this id"})
    }
    res.json(updateGrievance);
  }).catch((err)=>{
    res.status(500).json({message:"Error", err})
  })
})
    


module.exports = router;
