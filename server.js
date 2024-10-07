//I was able to set everything up on my own, but I used google a lot for each of the challenges.

const express = require(`express`)
const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
})

app.get(`/`, (req, res) => {
    res.send(`Welcome to my page`)
})

app.get(`/greetings/:username`, (req, res) => {
    res.send({
        msg: `Sup, ${req.params.username}?`
    })
})

app.get(`/roll/:dice`, (req, res) => {
    const dice = parseInt(req.params.dice)
    
    if (!isNaN(dice)) {
        const roll = Math.floor(Math.random() * dice) + 1
        res.send({
            roll: `You rolled a ${roll}`
        })
    } else{
        res.send({
            msg: `You must specify a number.`
        })
    }
})

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get(`/collectibles/:index`, (req, res) => {
    const index = parseInt(req.params.index)

    if (!isNaN(index) && index >= 0 && index < collectibles.length) {
        const item = collectibles[index]
        res.send({
            msg: `So, you want the ${item.name}? For $${item.price}, it can be yours!`
        })
    } else {
        res.send({ 
            msg: `This item is not yet in stock. Check back soon!` 
        })
    }
})

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
]


app.get('/shoes', (req, res) => {
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query

    let filteredShoes = shoes

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice))
    }

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice))
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase())
    }

    res.send(filteredShoes)
})


  app.get(`/*`, (req, res) => {
    res.send({
        error: `404 file not found`
    })
  })


