require('dotenv').config();
const { DataTypes } = require('sequelize');
const { sequelize } = require('../backend/routes/database'); // Assuming this is the file where you initialize Sequelize
const Student = require('../backend/models/Student')(sequelize, DataTypes); // Assuming this is the file containing your Student model definition

describe('Student model', () => {
  beforeEach(async () => {
    // Clear the Student table before each test
    await Student.destroy({ where: {} });
  });

  afterAll(async () => {
    // Close the Sequelize connection after all tests are done
    await sequelize.close();
  });

  it('should create a new student', async () => {
    // Create a new student
    const newStudent = await Student.create({
      username: 'john_doe',
      password: 'password123',
      fname: 'John',
      lname: 'Doe',
      section_id: 1
    });

    // Fetch the created student from the database
    const fetchedStudent = await Student.findByPk(newStudent.user_id);

    // Expect the fetched student to match the created one
    expect(fetchedStudent.username).toBe('john_doe');
    expect(fetchedStudent.password).toBe('password123');
    expect(fetchedStudent.fname).toBe('John');
    expect(fetchedStudent.lname).toBe('Doe');
    expect(fetchedStudent.section_id).toBe(1);
  });

  // Add more test cases as needed to cover other scenarios for the Student model
});
