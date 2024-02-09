const coursesModel = require('../Models/coursesModel')


const fetchCourses = async (req, res) => {
    try {
        const courses = await coursesModel.find();
        res.json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};
const addCourse = async (req, res) => {
    try {
        const newCourse = new coursesModel(req.body);
        const saveCourse = await newCourse.save();
        res.json(saveCourse);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const  updatedFields  = req.body;
        const existingCourse = await coursesModel.findById(courseId);

        if (!existingCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        Object.assign(existingCourse, updatedFields);

        const updatedCourse = await existingCourse.save();

        res.json(updatedCourse);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    fetchCourses,
    addCourse,
    updateCourse
}