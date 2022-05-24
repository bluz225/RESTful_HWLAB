const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get("/new", function(req,res){
    res.render("prehistoric_creatures/new.ejs")
})

router.get("/", function(req,res){
    let creatures = fs.readFileSync("./creatures.json")
    myCreatures = JSON.parse(creatures)
    // console.log(myCreatures)
    
    res.render("prehistoric_creatures/creaturesIndex.ejs", {myCreatures})
})

router.get("/:id", function(req,res){
    let creatures = fs.readFileSync("./creatures.json")
    myCreatures = JSON.parse(creatures)
    const creaturesIndexNum = req.params.id
    // console.log(myCreatures[creaturesIndexNum])
    res.render("prehistoric_creatures/show.ejs",{myCreatures:myCreatures[creaturesIndexNum]})
})

router.post("/", function(req,res){
    let creatures = fs.readFileSync("./creatures.json")
    myCreatures = JSON.parse(creatures)

    console.log(req.body)
    myCreatures.push(req.body)
    console.log(myCreatures)
    fs.writeFileSync("./creatures.json", JSON.stringify(myCreatures))
    res.redirect("/creatures")
    // console.log(myCreatures)
})

// get edit/:id

router.get("/edit/:id", function(req,res){
    const creatures = fs.readFileSync("./creatures.json")
    const myCreatures = JSON.parse(creatures)

    console.log(req.params.id)
    res.render("prehistoric_creatures/edit.ejs", {
        creatureID: req.params.id,
        creature: myCreatures[req.params.id]
    })
})

// PUT edit update

router.put("/:id", function(req,res){
    let creatures = fs.readFileSync("./creatures.json")
    const myCreatures = JSON.parse(creatures)
    console.log(req.params.id)
    console.log(req.body)
    myCreatures[req.params.id].name = req.body.name
    myCreatures[req.params.id].type = req.body.type
    console.log(myCreatures)

    fs.writeFileSync("./creatures.json", JSON.stringify(myCreatures))

    //redirect to dino Index
    res.redirect("/creatures")
})

// delete

router.delete("/:id", function(req,res){
        const creature = fs.readFileSync("./creatures.json")
        const myCreatures = JSON.parse(creature)

        myCreatures.splice(req.params.id,1)
        fs.writeFileSync("./creatures.json", JSON.stringify(myCreatures))
        res.redirect("/creatures")
})  

module.exports = router