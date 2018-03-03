const express = require('express')
const router = express()
const db = require('../db')

// get all teachers
router.get('/', (req, res) => {
  Promise.resolve()
    .then(() => getTeachers())
    .then((listOfTeachers) => {
      res.json(listOfTeachers);
    })
    .catch(() => res.status(500).json('Error grave'));
})

// post a teacher

router.post('/', (req, res) => {
  Promise.resolve()
    .then(() => createTeacher(req.body))
    .then(teacher => {
      res.status(201).json(teacher);
    })
    .catch(() => res.status(500).json('Error grave'));
});

const getTeachers = () => {
  return db.teacher.findAll()
    .then(response => {
      console.log("\n***Listando docentes");
      console.log(JSON.stringify(response));
      return response;
    })
    .catch(error => {
      throw error;
    })
}

const createTeacher = (teacher) => {
  const newTeacher = {
    first_name : teacher.first_name,
    last_name : teacher.last_name,
    identity_card : teacher.identity_card,
    degree : teacher.degree
  }

  return db.teacher.create(newTeacher)
  .then(response => {
    console.log("\n***creando docente");
    console.log(JSON.stringify(response));
    return response;
  }).catch(error => console.log(error));
}

module.exports = router
