const express = require("express")
const router = express.Router()
const fs = require("fs")


router.get("/", function(req,res){
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    myDinos = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    // console.log(nameFilter)
    if (nameFilter) {
        myDinos = myDinos.filter(function(dino){
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render("dinosaurs/dinoIndex.ejs", {myDinos})
})

router.get("/new", function(req,res){
    res.render("dinosaurs/new.ejs")
})

// show route (a specific dinosaur)
router.get("/:id", function(req,res){
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    myDinos = JSON.parse(dinosaurs)
    let dinoIndexNum = req.params.id
    res.render("dinosaurs/show.ejs", {dino:myDinos[dinoIndexNum]})
})

router.post("/", function(req,res){
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    myDinos = JSON.parse(dinosaurs)
    // add the new dino to the array
    myDinos.push(req.body)
    //save the dinosaurs to the jsonfile
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(myDinos))

    //redirect to dino Index
    res.redirect("/dinosaurs")
})

// GET / dinosaurs/edit/:id -- a view of a form to edit a specific dino at :id
router.get("/edit/:id", function(req,res){
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const myDinos = JSON.parse(dinosaurs)
    
    res.render("dinosaurs/edit.ejs", {
        dinoID: req.params.id,
        dino: myDinos[req.params.id]
    })
})

// PUT /dinosuars/:d --update a dino at :id in the database
router.put(`/:id`, function(req,res) {
    // we will get the dino from the request body
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    const myDinos = JSON.parse(dinosaurs)
    console.log(req.params.id)
    console.log(req.body)
    myDinos[req.params.id].name = req.body.name
    myDinos[req.params.id].type = req.body.type
    console.log(myDinos)

    fs.writeFileSync("./dinosaurs.json", JSON.stringify(myDinos))

    //redirect to dino Index
    res.redirect("/dinosaurs")
})

// DELETE /dinosaurs/:id -- destroy a dino @ :id
router.delete(`/:id`, function(req,res) {
    // we will get the dino from the request body
    // res.send(`destroy the dino ${req.params.id}`)

    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const myDinos = JSON.parse(dinosaurs)

    myDinos.splice(req.params.id,1)
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(myDinos))
    res.redirect("/dinosaurs")
})

module.exports = router