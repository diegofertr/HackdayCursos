
const express = require('express')
const router = express()
const db = require('../db')

// get all schedules
router.get('/', (req, res) => {
  Promise.resolve()
    .then(() => getSchedules())
    .then(schedules => {
      res.json(schedules);
    })
    .catch(() => res.status(500).json('Error grave'));
})

// [start_time, end_time, days, fid_classroom, fid_subject]
// post a schedule
// router.post('/', (req, res) => {
//   Promise.resolve()
//     .then(() => createClassroom(req.body))
//     .then(classroom => {
//       res.status(201).json(classroom);
//     })
//     .catch(() => res.status(500).json('Error grave'));
// });

const getSchedules = () => {
  return db.schedule.findAll()
    .then(response => {
      console.log("\n***Listando horarios");
      console.log(JSON.stringify(response));
      return response;
    })
    .catch(error => {
      throw error;
    })
}

// const createClassroom = (classroom) => {
//   const newClassroom = {
//     initials : classroom.initials,
//     description : classroom.description,
//   }

//   return db.classroom.create(newClassroom)
//   .then(response => {
//     console.log("\n***creando aula");
//     console.log(JSON.stringify(response));
//     return response;
//   }).catch(error => console.log(error));
// }

module.exports = router
