const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const authRouters = require('./routes/auth-API')
const dashboardRoutes = require('./routes/dashboard-API')
const documentRoutes = require('./routes/document-API')
const categoryRouter = require('./routes/category-API')
const memberRoutes = require('./routes/member-API')
const adminRoutes = require('./routes/admin-API')

const checkAuth = require('./middleware/check-auth')
const checkAdmin = require('./middleware/check-admin')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 50000
  })
)

app.use('/', authRouters)
app.use('/', checkAuth, dashboardRoutes)
app.use('/documents', checkAuth, documentRoutes)
app.use('/categories', checkAuth, categoryRouter)
app.use('/members', checkAuth, memberRoutes)
app.use('/admin', checkAuth, checkAdmin, adminRoutes)

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message })
})

app.listen(process.env.DAPP_PORT, function () {
  console.log(`Listening to the port ${process.env.DAPP_PORT}`)
})
