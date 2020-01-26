const express = require("express")
const cors = require("cors")

const PORT = 8085

const app = express()

app.use(cors())
app.options("*", cors())
app.use(express.json())

app.get("/person/:input", (req, res) => {
    res.json({ firstName: "Juozas", lastName: "Masiliunas" })
})

app.get("/facility/:firstName", (req, res) => {
    res.json({ name: "DGITL", alias: "Danske Bank" })
})

app.get("/exposure/:lastName", (req, res) => {
    setTimeout(() => res.json({ bio: "Nice guy" }), 3000)
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port!`)
})
