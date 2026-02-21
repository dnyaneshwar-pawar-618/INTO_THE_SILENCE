const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Home Page')
    res.end()
})

app.get('/user/:name', (req, res) => {
    const userName = req.params.name
    console.log(userName)
    res.end()
})

app.listen(3000, () => {
    console.log('App is listening on port 3000')
})