
const express = require('express')
const router = express()
const db = require('../db')
const moment = require('moment')

// get all schedules
router.get('/', (req, res) => {
  Promise.resolve()
    .then(() => getSchedules())
    .then(schedules => {
      res.json(schedules);
    })
    .catch(() => res.status(500).json('Error grave'));
})

router.get('/:day', (req, res) => {
  Promise.resolve()
    .then(() => getSchedulesByDay(req.params.day))
    .then(schedules => {
      res.json(schedules);
    })
    .catch(() => res.status(500).json('Error grave'));
})

router.get('/:day/:start_time/:end_time', (req, res) => {
  Promise.resolve()
    .then(() => createScheduleAlternative(req.params.day, req.params.start_time, req.params.end_time))
    .then(response  => {
      if (!response) {
        res.send({message: 'El horario está disponible'})
      } else {
        res.send({
          message: 'El horario ya está ocupado',
          response
        })
      }
      // res.send({
      //   response 
      // })
    })
    .catch(() => res.status(500).json('El horario que solicitó está disponible'))
})

// post a schedule
router.post('/', (req, res) => {
  Promise.resolve()
    .then(() => createSchedule(req.body))
    .then(schedule => {
      res.status(201).json(schedule);
    })
    .catch(() => res.status(500).json('Error grave'));
});

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

const createScheduleAlternative = (days, start_time, end_time) => {
  return db.schedule.findOne({
    where: {
      days: days,
      start_time: start_time,
      end_time: end_time
    }
  })
    .then(response => {
      return response
    })
    .catch(err => {
      throw err
    })
}

// [start_time, end_time, days, fid_classroom, fid_subject]
const createSchedule = (schedule) => {
  const newSchedule = {
    start_time : schedule.start_time,
    end_time: schedule.end_time,
    days: schedule.days,
    fid_classroom: schedule.fid_classroom,
    fid_subject: schedule.fid_subject
  }

  return db.schedule.create(newSchedule)
  .then(response => {
    console.log("\n***creando horario");
    console.log(JSON.stringify(response));
    return response;
  }).catch(error => console.log(error));
}

const getSchedulesByDay = (day) => {
  return db.schedule.findAll({
    where: {
      days: day
    },
    attributes: ['start_time', 'end_time'],
    order: [
      ['start_time', 'ASC']
    ]
  })
    .then(response => {
      console.log(`\n***Listando horarios ocupados del dia ${day}`);
      console.log(JSON.stringify(response));
      return response;
    })
    .catch(error => {
      throw error;
    })
}

module.exports = router
