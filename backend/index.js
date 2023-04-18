import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost", //the host for you database
    user: "root", //the username for your database
    password: "root", //the password for your database
    database: "howtocraft" //the name of your database (database itself, not the schema)
})

//dependencies
app.use(express.json())
app.use(cors())

//gets the homepage, useful for testing
// app.get("/", (req, res) => {
//     res.json({ message: "Hello World" })
// })

//EXAMPLE OF GET REQUEST
app.get("/", (req, res) => {
    const query = "SELECT * FROM howtocraft.‘default’;"
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})



app.post("/search", (req, res) => {
    const query = "SELECT `material`.`MaterialName` AS `MaterialName` FROM `material` WHERE (`material`.`MaterialName` = (SELECT  `material`.`MaterialName` FROM `material` WHERE (`material`.`MaterialName` = (SELECT  `has`.`MaterialName` FROM `has` WHERE (`has`.`RecipeID` = (SELECT `recipe`.`RecipeID` FROM `recipe` WHERE (`recipe`.`ItemName` = ?)))))))"
    //const query = "SELECT MaterialName FROM material WHERE ItemName = ?"
    const VALUES = [
        req.body.ItemName
    ]
    db.query (query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result)
        }
    })
})


//EXAMPLE OF POST REQUEST
app.post("/admin", (req, res) => {

    // if (req.body.isBaseMaterial == 1) {
        const query = "Insert into howtocraft.material(MaterialName, isBaseMaterial, ItemName) Values (?, 0, null);"

        const VALUES = [
            req.body.MaterialName
        ]

        db.query(query, [VALUES], (err, result) => {
            if (err) {
            console.log(err)
            } else {
            res.json(result)
            }
        })
    })


//EXAMPLE OF DELETE REQUEST
app.delete("/admin/delete/:id", (req, res) => {
    const itemID = req.params.id;
    const query = "DELETE FROM has WHERE RecipeID = ?"

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//EXAMPLE OF PUT REQUEST
app.put("/admin/update/:id", (req, res) => {
    const itemID = req.params.id;
    const query = "UPDATE howtocraft.material SET MaterialName = 'Stick' WHERE MaterialName = ?";

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//listen on port 8080
app.listen(8080, () => {
  console.log("Server is running")
});
