const express = require("express")
const app = express()
const fs = require("fs")
const methodOverride = require("method-override")

app.use(express.static("Public"))

const axios = require("axios")

app.set("view engine", "ejs")

const ejsLayouts = require("express-ejs-layouts")
app.use(ejsLayouts)

//body parser middleware
// ensures the data back to body comes as string
app.use(express.urlencoded({extended:false}))

app.use(methodOverride("_method"))

const PORT = 9000

app.get("/", function(req,res){
    res.render("index.ejs")
})

app.use("/creatures", require("./controllers/creatures"))
app.use("/dinosaurs", require("./controllers/dinosaurs"))

app.listen(PORT,function(){
    console.log(`🔥🔥🔥VEGETA: ITS OVER ${PORT}?!?!?!?!🔥🔥🔥`)
})







