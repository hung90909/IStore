const users = require("../molde/users")
const express = require('express')
const app = express()

app.get("/getAllUsers", (req , res) =>{
    const u = users.find({})
    users.find({}).then(users => {
        res.render("home",{
            users: users.map(user => user.toJSON())
           
        })
    })
})