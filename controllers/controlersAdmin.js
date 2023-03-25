const Admin = require('../molde/Admin')
const users = require("../molde/users")
const product = require("../molde/product")
const express = require('express')
const User = require('../molde/users')
const app = express()

/// Admin
app.get('/', (req, res) => {
   res.render("dangky")
})
app.post('/dangkyAdmin', async (req, res) => {

   try {
      const admin = new Admin(req.body)
      await admin.save()
      res.render("login")
   } catch (error) {
      res.status(500).send(error);
   }
})

app.get("/loginAdmin", async (req, res) => {
   res.render("login")
})



app.post('/login', async (req, res) => {
   try {
      const email = req.body.email;
      const password = req.body.passWord;
      const users = await Admin.findOne({ email: email, passWord: password })
      if (!users) {
         res.send("<script>alert('Email or password not found')</script>");
         return
      }
      res.redirect("/admin/home")
   } catch (error) {
      console.log(error);
   }
})

app.get("/home",(req , res) =>{
   res.render("home")
})


/// users 
app.get("/getAllUsers", (req, res) => {
   const u = User.find({})
   users.find({}).then(users => {
      res.render("managerUser", {
         users: users.map(user => user.toJSON())
      })
   })
})

app.get("/delete/:id", async (req, res) => {
   try {
      const u = await User.findByIdAndDelete(req.params.id, req.body)
      if (!u) {
         res.status(404).send("no items found")
      } else {
         res.status(200).redirect("/admin/getAllUsers")
      }
   } catch (error) {
      res.status(500).send(error);
   }
})

app.get("/edit/:id", async (req, res) => {
   try {
      const u = await User.findById(req.params.id)
      res.render("editUser", {
         titleView: "Update User",
         u: u.toJSON(),
      })
   } catch (error) {
      res.status(500).send(error);
   }

})
  
app.put("/inserUsers/:id", (req , res) => {
   console.log(req.params.id)
   console.log(req.body.name)
   users.updateOne({_id:req.params.id}, req.body)
   .then(() => res.redirect("/admin/getAllUsers"))
   .catch(err => console.error(err))
})

app.get("/addUsers",(req , res) =>{
   res.render("addUser",{
      titleView:"Inserter User",
   })
})
app.post("/inserUsers", async(req , res ) =>{
   try {
       const user = new User(req.body);
       await user.save();
       res.redirect("/admin/getAllUsers")
   } catch (error) {
      res.status(500).send(error);
   }
})
app.get("/user" , async (req, res) => {
    try {
      const user = User.find({})
      user.find({}).then(users => { 
         res.render("managerUser",{
            users: users.map(user => user.toJSON())
         })
      })
    } catch (error) {
      console.log(error)
    }
})

app.get("/product",(req , res) =>{
   res.redirect("/admin/getAllProducts")
})

//Product

app.get("/getAllProducts",(req , res) =>{
    product.find({}).then(product =>{
      res.render("managerProduct",{
         product: product.map(products => products.toJSON())
      })
    })
})

app.get("/addProduct",(req , res) =>{
   res.render("addProduct",{
      titleView:"Inserter Products",
   })
})

app.post("/inserProduct",async (req , res) =>{
   try {
      const products = new product(req.body)
      await products.save()
      res.redirect("/admin/getAllProducts")
   } catch (error) {
      res.status(500).render(error)
   }

})

app.get("/deleteProduct/:id",async (req , res) =>{
   try {
      const ps = await product.findByIdAndDelete(req.params.id , req.body)
      if(!ps){
         res.send("not found product")
      }else{
         res.redirect("/admin/getAllProducts")
      }
   } catch (error) {
      res.status(500).render(error)
   }
  
})

app.get("/editProduct/:id", async (req , res) =>{
   
    try {
       await product.findById(req.params.id)
      .then((products) =>{
          res.render("updateProduct",{
         titleView:"Update Product",
         products : products.toJSON()
      })
      })
     
    } catch (error) {
      res.status(500).render(error)
    }
})

app.put("/updateProduct/:id",(req , res) =>{
    product.updateOne({_id:req.params.id} , req.body)
    .then(() => res.status(200).redirect("/admin/getAllProducts"))
    .catch(error => res.status(500).render(error))
})


// search users 

app.get("/search", async (req, res) => {
   try {
     const name = req.query.search; 
     const users = await User.find({ name: { $regex: name, $options: "i" } }); 
    
     res.render("managerUser", {  users: users.map(user => user.toJSON()) }); 
   } catch (error) {
     res.status(500).send(error.message);
   }
 });
module.exports = app;