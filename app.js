const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('./middlewares/cors')

const apiRouter = require("./routes/apiRouter")
const pagesRouter = require("./routes/pages")

const connectToDatabase = require('./database/connect')


const app = express()
const PORT = 3001

connectToDatabase()

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  express.static(path.join(__dirname, 'public')),
  apiRouter,
  pagesRouter
);

app.listen(PORT)