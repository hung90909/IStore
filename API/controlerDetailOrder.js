const jimp = require("jimp")
const path = require('path');
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const session = require('express-session');
const multer = require("multer");
const product = require("../molde/product")
const detailOrder = require("../molde/detailOrder");
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

app.post('/getAllOrderXuLy', async (req, res) => {
    try {
        list = await detailOrder.find({ status: "xu ly" , ID_KH:req.body.id  })
        if (list) {
            res.json(list)
        }
    } catch (error) {
        console.log(error)
    }
})
app.get('/getAllOrderXuLyAdmin', async (req, res) => {
    try {
        list = await detailOrder.find({ status: "xu ly" })
        if (list) {
            res.json(list)
        }
    } catch (error) {
        console.log(error)
    }
})
app.post('/getAllOrderHuyDon', async (req, res) => {
    try {
        list = await detailOrder.find({ status: "huy don", ID_KH: req.body.id })
        if (list) {
            res.json(list)
        }
    } catch (error) {
        console.log(error)
    }
})
app.get('/getAllOrderHuyDonAdmin', async (req, res) => {
    try {
        list = await detailOrder.find({ status: "huy don"})
        if (list) {
            res.json(list)
        }
    } catch (error) {
        console.log(error)
    }
})
app.post('/getAllOrderXacNhan', async (req, res) => {
    try {
        list = await detailOrder.find({ status: "xac nhan",ID_KH:req.body.id })
        if (list) {
            res.json(list)
        }
    } catch (error) {
        console.log(error)
    }
})
app.get('/getAllOrderXacNhanAdmin', async (req, res) => {
    try {
        list = await detailOrder.find({ status: "xac nhan"})
        if (list) {
            res.json(list)
        }
    } catch (error) {
        console.log(error)
    }
})
app.post('/getAllOrderDaNhan', async (req, res) => {
    try {
        list = await detailOrder.find({ status: "da nhan", ID_KH:req.body.id })
        if (list) {
            res.json(list)
        }
    } catch (error) {
        console.log(error)
    }
})
app.get('/getAllOrderDaNhanAdmin', async (req, res) => {
    try {
        list = await detailOrder.find({ status: "da nhan"})
        if (list) {
            res.json(list)
        }
    } catch (error) {
        console.log(error)
    }
})


app.post("/addOrder", upload.single("image"), async (req, res) => {
    try {
        const order = new detailOrder(req.body)
        await order.save()
        res.send("them thanh cong")
    } catch (error) {
        console.log(error)
    }
})

app.put("/updateOrder/:id",upload.single("image"), async (req, res) => {
    try {
        await detailOrder.findOneAndUpdate({ _id: req.params.id },
            req.body
        )
        .then(() => res.send("update thanh cong"))
    } catch (error) {
        console.log(error)
    }
})

module.exports = app