<template>
    <div class="edu-component">
      <!-- Students Section -->
      <section class="section-students">
        <h2>Sección Estudiante</h2>
  
        <!-- Add Student Form -->
        <div class="form-container">
          <h3>Agregar Estudiante</h3>
          <form @submit.prevent="addStudent">
            <input type="text" v-model="newStudent.name" placeholder="Nombre">
            <input type="number" v-model="newStudent.age" placeholder="Edad">
            <button class="btn-add" type="submit">Add Estudiante</button>
          </form>
        </div>
  
        <!-- Update Student Form -->
        <div class="form-container">
          <h3>Actualizar Estudiante</h3>
          <form @submit.prevent="updateStudent">
            <select v-model="updateStudentData.studentId">
              <option v-for="student in students" :key="student._id" :value="student._id">{{ student.name }}</option>
            </select>
            <input type="text" v-model="updateStudentData.name" placeholder="New Nombre">
            <input type="number" v-model="updateStudentData.age" placeholder="New Edad">
            <button class="btn-update" type="submit">Update Estudiante</button>
          </form>
        </div>
  
        <!-- Students List -->
        <h3>Registro de Estudiantes</h3>
        <ul>
          <li v-for="student in students" :key="student._id">
            {{ student.name }} - {{ student.age }}
            <div class="btn-container">
              <button class="btn-update" @click="setUpdateStudentData(student)">Update</button>
              <button class="btn-delete" @click="deleteStudent(student)">Delete</button>
            </div>
          </li>
        </ul>
      </section>
  
      <!-- Courses Section -->
      <section class="section-courses">
        <h2>Sección Curso</h2>
  
        <!-- Add Course Form -->
        <div class="form-container">
          <h3>Agregar Curso</h3>
          <form @submit.prevent="addCourse">
            <input type="text" v-model="newCourse.name" placeholder="Nombre del Curso">
            <button class="btn-add" type="submit">Add Curso</button>
          </form>
        </div>
  
        <!-- Update Course Form -->
        <div class="form-container">
          <h3>Actualizar Curso</h3>
          <form @submit.prevent="updateCourse">
            <select v-model="updateCourseData.courseId">
              <option v-for="course in courses" :key="course._id" :value="course._id">{{ course.name }}</option>
            </select>
            <input type="text" v-model="updateCourseData.name" placeholder="New Nombre del Curso">
            <button class="btn-update" type="submit">Update Curso</button>
          </form>
        </div>
  
        <!-- Courses List -->
        <h3>Registro de Cursos</h3>
        <ul>
          <li v-for="course in courses" :key="course._id">
            {{ course.name }}
            <div class="btn-container">
              <button class="btn-update" @click="setUpdateCourseData(course)">Update</button>
              <button class="btn-delete" @click="deleteCourse(course)">Delete</button>
            </div>
          </li>
        </ul>
      </section>
  
      <!-- Grades Section -->
      <section class="section-grades">
        <h2>Sección Notas</h2>
  
        <!-- Add Grade Form -->
        <div class="form-container">
          <h3>Agregar Nota</h3>
          <form @submit.prevent="addGrade">
            <select v-model="newGrade.studentId">
              <option v-for="student in students" :key="student._id" :value="student._id">{{ student.name }}</option>
            </select>
            <select v-model="newGrade.courseId">
              <option v-for="course in courses" :key="course._id" :value="course._id">{{ course.name }}</option>
            </select>
            <input type="number" v-model="newGrade.value" placeholder="Nota">
            <button class="btn-add" type="submit">Add Nota</button>
          </form>
        </div>
  
        <!-- Update Grade Form -->
        <div class="form-container">
          <h3>Actualizar Nota</h3>
          <form @submit.prevent="updateGrade">
            <select v-model="updateGradeData.gradeId">
              <option v-for="grade in grades" :key="grade._id" :value="grade._id">
                Student: {{ getStudentName(grade.studentId) }} - Course: {{ getCourseName(grade.courseId) }} - Grade: {{ grade.value }}
              </option>
            </select>
            <input type="number" v-model="updateGradeData.value" placeholder="New Nota">
            <button class="btn-update" type="submit">Update Nota</button>
          </form>
        </div>
  
            <!-- Grades List -->
            <h3>Registro de Notas</h3>
        <ul>
          <li v-for="grade in grades" :key="grade._id">
            Student: {{ getStudentName(grade.studentId) }} - Course: {{ getCourseName(grade.courseId) }} - Grade: {{ grade.value }}
            <div class="btn-container">
              <button class="btn-update" @click="setUpdateGradeData(grade)">Update</button>
              <button class="btn-delete" @click="deleteGrade(grade)">Delete</button>
            </div>
          </li>
        </ul>
      </section>

    <!-- Grade Statistics -->
    <section class="form-container">
      <h3>Datos Estadísticos del Estudiante</h3>
      <form @submit.prevent="calculateGradeStats">
        <select v-model="selectedStudentForStats">
          <option v-for="student in students" :key="student._id" :value="student._id">{{ student.name }}</option>
        </select>
        <button class="btn-calculate" type="submit">Calcular Stats</button>
      </form>
      <div v-if="gradeStats">
        <p>Nota Promedio: {{ gradeStats.average }}</p>
        <p>Nota Mínima: {{ gradeStats.minGrade }}</p>
        <p>Nota Máxima: {{ gradeStats.maxGrade }}</p>
        <button class="btn-clear" @click="clearStats">Limpiar Stats</button>
      </div>
    </section>

    <!-- Calculate Course Grade Stats Form -->
    <section class="form-container">
      <h3>Datos Estadísticos del Curso</h3>
      <form @submit.prevent="calculateCourseGradeStats">
        <select v-model="selectedCourseForStats">
          <option v-for="course in courses" :key="course._id" :value="course._id">{{ course.name }}</option>
        </select>
        <button class="btn-calculate" type="submit">Calcular Stats</button>
      </form>
      <div v-if="courseGradeStats">
        <p>Nota Promedio: {{ courseGradeStats.average }}</p>
        <p>Nota Mínima: {{ courseGradeStats.minGrade }}</p>
        <p>Nota Máxima: {{ courseGradeStats.maxGrade }}</p>
        <button class="btn-clear" @click="clearCourseStats">Limpiar Stats</button>
      </div>
    </section>

  </div>
</template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        students: [],
        courses: [],
        grades: [],
        newStudent: {},
        newCourse: {},
        newGrade: {},
        updateStudentData: {},
        updateCourseData: {},
        updateGradeData: {},
        selectedStudentForStats: null,
        gradeStats: null,
        selectedCourseForStats: null,
        courseGradeStats: null,
        backend_server: 'http://127.0.0.1:3000'
      };
    },

    methods: {
      addStudent() {
        axios.post(`${this.backend_server}/students`, this.newStudent)
          .then(res => {
            this.students.push(res.data);
            this.newStudent = {};
          })
          .catch(error => console.log(error));
      },
      addCourse() {
        axios.post(`${this.backend_server}/courses`, this.newCourse)
          .then(res => {
            this.courses.push(res.data);
            this.newCourse = {};
          })
          .catch(error => console.log(error));
      },
      addGrade() {
        axios.post(`${this.backend_server}/grades`, this.newGrade)
          .then(res => {
            this.grades.push(res.data);
            this.newGrade = {};
          })
          .catch(error => console.log(error));
      },
      deleteStudent(student) {
        axios.delete(`${this.backend_server}/students/${student._id}`)
          .then(() => {
            this.students = this.students.filter(s => s._id !== student._id);
          })
          .catch(error => console.log(error));
      },
      deleteCourse(course) {
        axios.delete(`${this.backend_server}/courses/${course._id}`)
          .then(() => {
            this.courses = this.courses.filter(c => c._id !== course._id);
          })
          .catch(error => console.log(error));
      },
      deleteGrade(grade) {
        axios.delete(`${this.backend_server}/grades/${grade._id}`)
          .then(() => {
            this.grades = this.grades.filter(g => g._id !== grade._id);
          })
          .catch(error => console.log(error));
      },
      updateStudent() {
        axios.put(`${this.backend_server}/students/${this.updateStudentData.studentId}`, this.updateStudentData)
          .then(res => {
            const index = this.students.findIndex(student => student._id === this.updateStudentData.studentId);
            this.$set(this.students, index, res.data);
            this.updateStudentData = {};
          })
          .catch(error => console.log(error));
      },
      updateCourse() {
        axios.put(`${this.backend_server}/courses/${this.updateCourseData.courseId}`, this.updateCourseData)
          .then(res => {
            const index = this.courses.findIndex(course => course._id === this.updateCourseData.courseId);
            this.$set(this.courses, index, res.data);
            this.updateCourseData = {};
          })
          .catch(error => console.log(error));
      },
      updateGrade() {
        axios.put(`${this.backend_server}/grades/${this.updateGradeData.gradeId}`, this.updateGradeData)
          .then(res => {
            const index = this.grades.findIndex(grade => grade._id === this.updateGradeData.gradeId);
            this.$set(this.grades, index, res.data);
            this.updateGradeData = {};
          })
          .catch(error => console.log(error));
      },
      
      calculateGradeStats() {
      axios.get(`${this.backend_server}/students/${this.selectedStudentForStats}/grades/stats`)
        .then(response => {
          this.gradeStats = response.data;
        })
        .catch(error => {
          console.error(error);
        });
      },

      calculateCourseGradeStats() {
        axios.get(`${this.backend_server}/courses/${this.selectedCourseForStats}/grades/stats`)
        .then(response => {
            this.courseGradeStats = response.data;
        })
        .catch(error => {
            console.error(error);
        });
    },

      fetchData() {
        axios.get(`${this.backend_server}/students`)
          .then(res => this.students = res.data)
          .catch(error => console.log(error));
  
        axios.get(`${this.backend_server}/courses`)
          .then(res => this.courses = res.data)
          .catch(error => console.log(error));
  
        axios.get(`${this.backend_server}/grades`)
          .then(res => this.grades = res.data)
          .catch(error => console.log(error));
      },
      getStudentName(studentId) {
        const student = this.students.find(s => s._id === studentId);
        return student ? student.name : '';
      },
      getCourseName(courseId) {
        const course = this.courses.find(c => c._id === courseId);
        return course ? course.name : '';
      },
      setUpdateStudentData(student) {
        this.updateStudentData = {
          studentId: student._id,
          name: student.name,
          age: student.age
        };
      },
      setUpdateCourseData(course) {
        this.updateCourseData = {
          courseId: course._id,
          name: course.name
        };
      },
      setUpdateGradeData(grade) {
        this.updateGradeData = {
          gradeId: grade._id,
          value: grade.value
        };
      },

      clearStats() {
      this.gradeStats = null;
      this.selectedStudentForStats = null;
    },

    clearCourseStats() {
      this.courseGradeStats = null;
      this.selectedCourseForStats = null;
    },

    },

    created() {
      this.fetchData();
    }
  };
  
  </script>
  
  <style scoped>
  /* Estilos específicos del componente */
  
  /* Estilos generales */
  .edu-component {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Estilos para la sección Students */
  .section-students {
    background-color: #f7f7f7;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  /* Estilos para la sección Courses */
  .section-courses {
    background-color: #e3f2fd;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  /* Estilos para la sección Grades */
  .section-grades {
    background-color: #f0f4c3;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  /* Estilos para los títulos de formularios y listas */
  h3 {
    margin-bottom: 10px;
  }
  
  .form-container {
    margin-bottom: 20px;
  }
  
  /* Estilos para los botones */
  .btn-container {
    display: flex;
    gap: 10px;
  }
  
  .btn-add,
  .btn-update,
  .btn-delete,
  .btn-calculate,
  .btn-clear {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    margin: 0 5px; /* Añade un pequeño margen entre los botones */
  }
  
  .btn-add {
    background-color: #28a745;
    color: #fff;
  }
  
  .btn-update {
    background-color: #007bff;
    color: #fff;
  }
  
  .btn-delete {
    background-color: #dc3545;
    color: #fff;
  }

  .btn-calculate {
  background-color: #ffc107;
  color: #000;
}
    .btn-clear {
    background-color: #6c757d; /* Gris oscuro */
    color: #fff;
}

  
  </style>
  
  