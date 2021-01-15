const express = require('express')
const app = express()
const request = require('../controller/handle');
app.get('/s', (req, res) => {
    res.send('hello')
})


app.get('/isus', (req, res) => {
    res.send('hello pong')
})


app.post('/CreateStudent', async (req, res) => {
    try {
        var result = await new request().createStudent(req.body)
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error)
    }


})


app.post('/getStuById', async (req, res) => {
    try {
        var result = await new request().getByID(req.body)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})
app.post('/getAllStu', async (req, res) => {
    try {
        var result = await new request().getAll(req.body)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})
app.post('/updateGrade',async (req, res) => {
    try {
        var result = await new request().updateGrade(req.body)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})
app.post('/delete',async (req, res) => {
    try {
        var result = await new request().delete(req.body)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports = app