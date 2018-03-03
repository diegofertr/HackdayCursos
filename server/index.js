const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// Iniciamos los modelos de sequelize
const db = require('./db')
const config = require('./config')

// Sincronizamos la base de datos
db.sequelize.sync().done(() => {
  console.log("\n***Base de datos generada")
  app.listen(config.port, () => {
    console.log(`Api rest escuchando en localhost:${config.port}`)
  })
})

// middlewares
app.use(bodyParser.urlencoded({ extended: false}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.use((req, res, next) => {
  console.log("***Procesando petición...\n")
  next();
});

/**
 * @api {GET} / Permite obtener el estado de la aplicación
 *
 * @apiName Obtener estado del servicio
 * @apiGroup Estado
 * @apiVersion 1.0.0
 *
 * @apiParamExample  {text} Obtener estado del servicio (CURL)
 * curl -X GET \
 *    'http://127.0.0.1:4000/'
 *
 * @apiSuccess (Respuesta Exitosa) {String} respuesta Respuesta de servicio
 *
 *
 * @apiSuccessExample {json} Respuesta exitosa
 *  HTTP/1.1  200  OK
 *  ***Aplicación NODEJS iniciada en EXPRESSJS\n
 *
 */

app.get("/", (req, res) => {
  res.end("***Api Rest iniciada con Express y Node\n")
})

// routes
const teacherRoutes = require('./routes/Teacher')
const subjectRoutes = require('./routes/Subject')
const classroomRoutes = require('./routes/Classroom')
const scheduleRoutes = require('./routes/Schedule')

app.use('/teachers', teacherRoutes)
app.use('/subjects', subjectRoutes)
app.use('/classrooms', classroomRoutes)
app.use('/schedules', scheduleRoutes)
