const jimp = require("jimp")
const path = require('path');
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const session = require('express-session');
const multer = require("multer");
const buyer = require("../molde/Buyer")
const address = require("../molde/adres")
const app = express();
app.use(bodyParser.json())
app.use(express.json())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // tên file
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 } // giới hạn kích thước file tải lên là 2MB
});

app.get("/getAllBuyer", async (req, res) => {

    await buyer.find()
        .then(item => res.json(item))
        .catch(err => console.log(err))
})

app.post("/getAddress", async (req, res) => {
    try {
        const id = req.body.id;
        const adres = await address.find({ID_KH:id})
        if(adres){
            res.json(adres)
        }
    } catch (error) {
        console.log(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        const email = req.body.email
        const password = req.body.password
        const check = await buyer.findOne({ email: email })
        if (check) {
            check.comparePassword(password, function (err, resulf) {
                if (resulf && !err) {
                    res.json(check);
                } else {
                    const err = "Mât khẩu không đúng !"
                    res.status(400).send(err)
                }
            })
        } else {
            const err = "Email không tồn tại !"
            res.status(400).send(err)
        }

    } catch (error) {
        console.log(error);
    }
})

app.post("/Register", async (req, res) => {
    try {
        const user = req.body;
        console.log(user)
        const email = req.body.email
        const checkEmail = await buyer.findOne({ email: email})
        if(checkEmail){
            const err = "email not error";
            res.status(400).send(err);
            return
        }
        const users = new buyer(req.body);
        await users.save();
        res.json(users);
    } catch (error) {
        console.log(error);
    }

})
// app.get("/add" , async (req, res) => {
//     try {
//          await typeProduct.find()
//         .then(item => res.json(item))
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.get("/getNameLSP", async (req, res) => {
//    try {
//       const idLSP = req.query.idLSP;
//       const nameLSP = await TypeProduct.find({typeProductID: idLSP})
//       res.json(nameLSP)
//    } catch (error) {
//     console.log(error);
//    }
// })

// app.get("/deleteProduct/:id",async (req , res) =>{
//     try {
//         await product.findByIdAndDelete(req.params.id)
//         .then(() => res.send("xoa thanh cong"))
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.put("/updateProduct/:id",upload.single("image"), async (req , res) =>{
//      try {
//         await product.findByIdAndUpdate({_id:req.params.id},req.body)
//         .then(() =>{res.send("update thanh cong")})
//      } catch (error) {
//         console.log(error);
//      }
// })


module.exports = app;