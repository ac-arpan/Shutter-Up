const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


// Initialize the express app
const app = express()

// Bodyparser Middleware
app.use(express.json())

//DB config
const db = config.get('mongoURI')

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then( () => console.log('Woooh..!! MongoDB Connected!'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('<h1>Hello World Buddy</h1>')
})

// Users Routes
app.use('/api/users', require('./routes/api/users'))
//Auth Routes
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server runnig on PORT ${PORT}`))