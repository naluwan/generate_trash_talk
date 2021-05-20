// require
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const generateTrashTalk = require('./generate_trashTalk')
const port = 3000
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();
// setting template engine
app.engine('handlebars', exphbs({ helpers: multihelpers, defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const userPicked = req.body.userPicked
  const rubbish = generateTrashTalk(userPicked)
  res.render('index', { rubbish, userPicked })
})

// Express listen
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})