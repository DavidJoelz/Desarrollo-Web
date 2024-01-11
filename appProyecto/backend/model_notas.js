const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: () => "Please enter a valid age",
    },
  },
});

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const GradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  value: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0 && value <= 100;
      },
      message: () => "Please enter a valid grade between 0 and 100",
    },
  },
});

const Student = mongoose.model("Student", StudentSchema);
const Course = mongoose.model("Course", CourseSchema);
const Grade = mongoose.model("Grade", GradeSchema);

module.exports = { Student, Course, Grade };