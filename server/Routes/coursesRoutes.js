const express = require('express');
const coursesController=require('../Controller/coursesController');
const router = express.Router();

router.get('/fetchCourses',coursesController.fetchCourses);
router.post('/addCourses',coursesController.addCourse);
router.put('/updateCourses/:id',coursesController.updateCourse);
module.exports = router;