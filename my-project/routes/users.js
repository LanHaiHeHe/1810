var express = require('express');
var router = express.Router();
var token = require("../libs/token.js");
var {
  find,
  insert,
  del,
  update
} = require("../libs/mongo.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/findUser', async (req, res, next) => {
  let {
    id,
    name,
    skill
  } = req.body
  let data = await find(`students`, {
    id
  })
  res.send(data);
});

// router.post('/login', async (req, res, next) => {
//   // console.log(req.body);
//   let {
//     inputEmail,
//     inputPassword
//   } = req.body;
//   let data = await find(`studentLogin`, {
//     name: inputEmail
//   });
//   // inputPassword=Number(inputPassword);
//   // console.log(inputPassword,data[0].password);
//   if (data[0].password === inputPassword) {
//     res.send("success");
//     console.log(345);
//   } else {
//     res.send("fail");
//   }
// });

router.post('/login', async (req, res, next) => {
  console.log(req.body);
  let {
    inputEmail,
    inputPassword
  } = req.body
  let data = await find(`studentLogin`, {
    name: inputEmail
  })
  
  console.log(data[0].password,inputPassword);
  if (data[0].password === inputPassword) {
    res.send({
      status: "success",
      token: token.createToken({
        inputEmail,
        inputPassword
      }, 120)
    });
    
  } else {
    res.send({
      status: "fail"
    });
  }
});

router.post('/autoLogin', async (req, res, next) => {
  // console.log(req.headers)
  res.send({
    status: token.checkToken(req.headers.token) 
  })
})

router.post('/sign', async (req, res, next) => {
  // console.log(req.body);
  let {
    inputEmail,
    inputPassword
  } = req.body;
  let data = await find(`studentLogin`, {
    name: inputEmail
  });
  if(data.length>0){
    res.send(`用户名已存在`);
  }else{
    let data2=await insert(`studentLogin`,[{
      name:inputEmail,
      password:inputPassword
    }]);
    res.send('success');
  }
});



var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({
  storage: storage
});
router.post('/upload', upload.single('abc'), function (req, res, next) {
  res.send({
    status: "success",
    file: req.file
  });
});
module.exports = router;