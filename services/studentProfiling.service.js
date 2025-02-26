const {
  NewStudent,
  Returning,
  SecondDegreeTaker,
  Transferee,
} = require("../models");

const submit = async (
 body) => {
  try {
    const { email,
      firstName,
      middleName,
      lastName,
      studentType,
      residency,
      shs,
      awardsReceived,
      schoolType,
      schoolAddress,
      yearGraduated,
      schoolTypeCollege,
      nameCollege,
      courseEnrolled,
      highestAttainedYear,
      courseCompleter,
      courseCompleted,
      schoolGraduated
     } = body
    const checkExisting = await Promise.all([
      NewStudent.findOne({ where: { email } }),
      Transferee.findOne({ where: { email } }),
      Returning.findOne({ where: { email } }),
      SecondDegreeTaker.findOne({ where: { email } }),
    ]);

    const existingTypes = ["New", "Transferee", "Returning", "2nd Degree Taker"];
    for (let i = 0; i < checkExisting.length; i++) {
      if (checkExisting[i] && checkExisting[i].lastName === lastName && checkExisting[i].firstName === firstName) {
        throw new Error(`Student already exists in ${existingTypes[i]}`);
      }
    }

    // Create student record based on type
    let createdStudent;
    if (studentType === "New Student") {
      createdStudent = await NewStudent.create(body);
    } else if (studentType === "Transferee") {
      createdStudent = await Transferee.create(body);
    } else if (studentType === "Returning Student") {
      createdStudent = await Returning.create(body);
    } else if (studentType === "2nd Degree Taker") {
      createdStudent = await SecondDegreeTaker.create(body);
    }

    return { message: "success", data: createdStudent };
    
  } catch (error) {
    return { 
      message:"error occured",
      error:error.message
    }
    
  }
};

module.exports ={
    submit
}