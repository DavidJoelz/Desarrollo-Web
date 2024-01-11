const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const { Student, Course, Grade } = require("./model_notas");

const app = express();

app.use(express.json());
app.use(cors());

// Endpoints para estudiantes
// 1. Obtener todos los estudiantes
app.get("/students", async (req, res) => {
  const allStudents = await Student.find();
  return res.status(200).json(allStudents);
});

// 2. Obtener un estudiante por ID
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  return res.status(200).json(student);
});

// 3. Agregar un nuevo estudiante
app.post("/students", async (req, res) => {
  const newStudent = new Student({ ...req.body });
  const insertedStudent = await newStudent.save();
  return res.status(201).json(insertedStudent);
});

// 4. Actualizar un estudiante por ID
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndUpdate(id, req.body);
  const updatedStudent = await Student.findById(id);
  return res.status(200).json(updatedStudent);
});

// 5. Eliminar un estudiante por ID
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const deletedStudent = await Student.findByIdAndDelete(id);
  return res.status(200).json(deletedStudent);
});

// Endpoints para cursos
// 6. Obtener todos los cursos
app.get("/courses", async (req, res) => {
  const allCourses = await Course.find();
  return res.status(200).json(allCourses);
});

// 7. Obtener un curso por ID
app.get("/courses/:id", async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  return res.status(200).json(course);
});

// 8. Agregar un nuevo curso
app.post("/courses", async (req, res) => {
  const newCourse = new Course({ ...req.body });
  const insertedCourse = await newCourse.save();
  return res.status(201).json(insertedCourse);
});

// 9. Actualizar un curso por ID
app.put("/courses/:id", async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndUpdate(id, req.body);
  const updatedCourse = await Course.findById(id);
  return res.status(200).json(updatedCourse);
});

// 10. Eliminar un curso por ID
app.delete("/courses/:id", async (req, res) => {
  const { id } = req.params;
  const deletedCourse = await Course.findByIdAndDelete(id);
  return res.status(200).json(deletedCourse);
});

// Endpoints para calificaciones
// 11. Obtener todas las calificaciones
app.get("/grades", async (req, res) => {
  const allGrades = await Grade.find();
  return res.status(200).json(allGrades);
});

// 12. Obtener una calificación por ID
app.get("/grades/:id", async (req, res) => {
  const { id } = req.params;
  const grade = await Grade.findById(id);
  return res.status(200).json(grade);
});

// 13. Agregar una nueva calificación
app.post("/grades", async (req, res) => {
  const newGrade = new Grade({ ...req.body });
  const insertedGrade = await newGrade.save();
  return res.status(201).json(insertedGrade);
});

// 14. Actualizar una calificación por ID
app.put("/grades/:id", async (req, res) => {
  const { id } = req.params;
  await Grade.findByIdAndUpdate(id, req.body);
  const updatedGrade = await Grade.findById(id);
  return res.status(200).json(updatedGrade);
});

// 15. Eliminar una calificación por ID
app.delete("/grades/:id", async (req, res) => {
  const { id } = req.params;
  const deletedGrade = await Grade.findByIdAndDelete(id);
  return res.status(200).json(deletedGrade);
});

// Consultas adicionales
// 16. Obtener todas las calificaciones de un estudiante por ID
app.get("/students/:id/grades", async (req, res) => {
  const { id } = req.params;
  const studentGrades = await Grade.find({ studentId: id });
  return res.status(200).json(studentGrades);
});

// 17. Obtener todos los estudiantes de un curso por ID
app.get("/courses/:id/students", async (req, res) => {
  const { id } = req.params;
  const courseStudents = await Grade.find({ courseId: id }).populate('studentId');
  const students = courseStudents.map(item => item.studentId);
  return res.status(200).json(students);
});

// 18. Calcular el promedio de calificaciones de un estudiante por ID
app.get("/students/:id/average", async (req, res) => {
  const { id } = req.params;
  const studentGrades = await Grade.find({ studentId: id });
  const totalGrades = studentGrades.reduce((sum, grade) => sum + grade.value, 0);
  const average = totalGrades / studentGrades.length;
  return res.status(200).json({ average });
});

// 19. Calcular el promedio de calificaciones de un curso por ID
app.get("/courses/:id/average", async (req, res) => {
  const { id } = req.params;
  const courseGrades = await Grade.find({ courseId: id });
  const totalGrades = courseGrades.reduce((sum, grade) => sum + grade.value, 0);
  const average = totalGrades / courseGrades.length;
  return res.status(200).json({ average });
});

// 20. Obtener la calificación máxima de un estudiante por ID
app.get("/students/:id/maxGrade", async (req, res) => {
  const { id } = req.params;
  const studentGrades = await Grade.find({ studentId: id });
  const maxGrade = Math.max(...studentGrades.map(grade => grade.value));
  return res.status(200).json({ maxGrade });
});

// 21. Obtener la calificación máxima de un curso por ID
app.get("/courses/:id/maxGrade", async (req, res) => {
  const { id } = req.params;
  const courseGrades = await Grade.find({ courseId: id });
  const maxGrade = Math.max(...courseGrades.map(grade => grade.value));
  return res.status(200).json({ maxGrade });
});

// 22. Obtener la calificación mínima de un estudiante por ID
app.get("/students/:id/minGrade", async (req, res) => {
  const { id } = req.params;
  const studentGrades = await Grade.find({ studentId: id });
  const minGrade = Math.min(...studentGrades.map(grade => grade.value));
  return res.status(200).json({ minGrade });
});

// 23. Obtener la calificación mínima de un curso por ID
app.get("/courses/:id/minGrade", async (req, res) => {
  const { id } = req.params;
  const courseGrades = await Grade.find({ courseId: id });
  const minGrade = Math.min(...courseGrades.map(grade => grade.value));
  return res.status(200).json({ minGrade });
});

// 24. Endpoint para obtener estadísticas de calificaciones de un estudiante por ID
app.get("/students/:id/grades/stats", async (req, res) => {
    const { id } = req.params;
    try {
      const studentGrades = await Grade.find({ studentId: id });
      const totalGrades = studentGrades.reduce((sum, grade) => sum + grade.value, 0);
      const average = totalGrades / studentGrades.length;
      const maxGrade = Math.max(...studentGrades.map(grade => grade.value));
      const minGrade = Math.min(...studentGrades.map(grade => grade.value));
  
      return res.status(200).json({
        average,
        maxGrade,
        minGrade
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 25. Endpoint para obtener estadísticas de calificaciones de un curso por ID
app.get("/courses/:id/grades/stats", async (req, res) => {
    const { id } = req.params;
    try {
      const courseGrades = await Grade.find({ courseId: id });
      const totalGrades = courseGrades.reduce((sum, grade) => sum + grade.value, 0);
      const average = totalGrades / courseGrades.length;
      const maxGrade = Math.max(...courseGrades.map(grade => grade.value));
      const minGrade = Math.min(...courseGrades.map(grade => grade.value));
  
      return res.status(200).json({
        average,
        maxGrade,
        minGrade
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/appNotas2", { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const path = __dirname + '/views/';
app.use(express.static(path));
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

start();
