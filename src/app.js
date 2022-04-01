const express = require('express')
const path = require('path')
const make_request = require('./scripts/script')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('', (req, res) => {
    res.sendFile(`${publicDirectoryPath}/index.htm`)
})

app.get('/search', async (req, res) => {
    tags = req.query.tags
    page = req.query.page

    if(!tags) {
        res.status(400).send({'error': 'No tags provided'})
    }

    if(!page) {
        page = 0
    }

    make_request(tags, 10, parseInt(page)).then(result => {
        res.status(200).send(result)
    })
})

module.exports = app