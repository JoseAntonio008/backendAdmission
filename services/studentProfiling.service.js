const {
  NewStudent,
  Returning,
  SecondDegreeTaker,
  Transferee,
} = require("../models");

const submit = async (
  email,
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
) => {
  try {
    
    const checkEmailinNew = await NewStudent.findOne({
      where: {
        email,
      },
    });
    const checkEmailinTransferee = await Transferee.findOne({
      where: {
        email,
      },
    });
    const checkEmailinReturning = await Returning.findOne({
      where: {
        email,
      },
    });
    const checkEmailinSecond = await SecondDegreeTaker.findOne({
      where: {
        email,
      },
    });
    if (
      checkEmailinNew &&
      checkEmailinNew.lastName == lastName &&
      checkEmailinNew.firstName == firstName
    ) {
      throw new Error("already exists in New");
    }
    if (
        checkEmailinTransferee &&
        checkEmailinTransferee.lastName == lastName &&
        checkEmailinTransferee.firstName == firstName
      ) {
        throw new Error("already exists in transferee");
      }
      if (
        checkEmailinReturning &&
        checkEmailinReturning.lastName == lastName &&
        checkEmailinReturning.firstName == firstName
      ) {
        throw new Error("already exists in Returning");
      }
      if (
        checkEmailinSecond &&
        checkEmailinSecond.lastName == lastName &&
        checkEmailinSecond.firstName == firstName
      ) {
        throw new Error("already exists in 2nd degree taker");
      }

    
      if (studentType == "New Student") {
        console.log("creating new student profile");
        
        const create = await NewStudent.create({
          email,
          firstName,
          middleName,
          lastName,
          studentType,
          residency,
          shs,
          schoolType,
          schoolAddress,
          yearGraduated,
          awardsReceived
        })
      }
      if (studentType == "Transferee") {
        console.log("creating Transferee profile");

        const create = await Transferee.create({
          email,
          firstName,
          middleName,
          lastName,
          studentType,
          typeOfSchool,
          nameCollege,
          courseEnrolled,
          highestAttainedYear,
          schoolAddress,
          awardsReceived,
          residency
        })
        
      }
      if (studentType == "Returning Student") {
        console.log("creating returning student profile");
        

        const create = await Returning.create({
          email,
          firstName,
          middleName,
          lastName,
          studentType
        })
      }
      if (studentType == "2nd Degree Taker") {
        console.log("creating 2nd degree taker");
        
        const create = await SecondDegreeTaker.create({
          email,
          firstName,
          middleName,
          lastName,
          studentType,
          residency,
          courseCompleter,
          courseCompleted,
          yearGraduated,
          schoolGraduated,
          schoolAddress,
          awardsReceived
        })
      }
    return { 
      message:"success",
      data:`email: ${email}`
    }
    
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