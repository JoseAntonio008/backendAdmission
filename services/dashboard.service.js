const { Admissiontakers, Schedule } = require("../models");

const fetchTotalApplicants = async () => {
  try {
    const noOfStudents = await Admissiontakers.findAndCountAll();
    console.log(noOfStudents);
    if (noOfStudents.length == 0) {
      return {
        message: "no of students",
        data: 0,
      };
    }
    return {
      message: "no of students",
      data: noOfStudents,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};
const fetchTotalSchedules = async () => {
  try {
    const noOfStudents = await Schedule.findAndCountAll();
    console.log(noOfStudents);
    return {
      message: "no of students",
      data: noOfStudents,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

module.exports = {
  fetchTotalApplicants,
  fetchTotalSchedules,
};
