const express = require('express')
const router = express()
const db = require('../db')

// get all subjects
router.get('/', (req, res) => {
  Promise.resolve()
    .then(() => getSubjects())
    .then((listOfSubjects) => {
      res.json(listOfSubjects);
    })
    .catch(() => res.status(500).json('Error grave'));
})

// post a subject
router.post('/', (req, res) => {
  Promise.resolve()
    .then(() => createSubject(req.body))
    .then(subject => {
      res.status(201).json(subject);
    })
    .catch(() => res.status(500).json('Error grave'));
});

const getSubjects = () => {
  return db.subject.findAll()
    .then(response => {
      console.log("\n***Listando materias");
      console.log(JSON.stringify(response));
      return response;
    })
    .catch(error => {
      throw error;
    })
}

const createSubject = (subject) => {
  const newSubject = {
    initials : subject.initials,
    description : subject.description,
    fid_teacher : subject.fid_teacher,
  }

  return db.subject.create(newSubject)
  .then(response => {
    console.log("\n***creando materia");
    console.log(JSON.stringify(response));
    return response;
  }).catch(error => console.log(error));
}

module.exports = router
