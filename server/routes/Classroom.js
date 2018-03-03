const express = require('express')
const router = express()
const db = require('../db')

// get all classrooms
router.get('/', (req, res) => {
  Promise.resolve()
    .then(() => getClasrooms())
    .then((listOfClassrooms) => {
      res.json(listOfClassrooms);
    })
    .catch(() => res.status(500).json('Error grave'));
})

// post a classroom

router.post('/', (req, res) => {
  Promise.resolve()
    .then(() => createClassroom(req.body))
    .then(classroom => {
      res.status(201).json(classroom);
    })
    .catch(() => res.status(500).json('Error grave'));
});

const getClasrooms = () => {
  return db.classroom.findAll()
    .then(response => {
      console.log("\n***Listando aulas");
      console.log(JSON.stringify(response));
      return response;
    })
    .catch(error => {
      throw error;
    })
}

const createClassroom = (classroom) => {
  const newClassroom = {
    initials : classroom.initials,
    description : classroom.description,
  }

  return db.classroom.create(newClassroom)
  .then(response => {
    console.log("\n***creando aula");
    console.log(JSON.stringify(response));
    return response;
  }).catch(error => console.log(error));
}

module.exports = router
