const {
  NewStudent,
  Returning,
  SecondDegreeTaker,
  Transferee,
  Admissiontakers,
} = require("../models");
const { Op } = require("sequelize");

const submit = async (body) => {
  try {
    const {
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
      schoolGraduated,
    } = body;
    const checkExisting = await Promise.all([
      NewStudent.findOne({ where: { email } }),
      Transferee.findOne({ where: { email } }),
      Returning.findOne({ where: { email } }),
      SecondDegreeTaker.findOne({ where: { email } }),
    ]);

    const existingTypes = [
      "New",
      "Transferee",
      "Returning",
      "2nd Degree Taker",
    ];
    for (let i = 0; i < checkExisting.length; i++) {
      if (
        checkExisting[i] &&
        ((checkExisting[i].lastName === lastName &&
          checkExisting[i].firstName === firstName) ||
          checkExisting[i].email === email)
      ) {
        return {
          message: "success",
          data: `Student already exists in ${existingTypes[i]} student`,
        };
      }
    }

    // Create student record based on type
    let createdStudent;
    if (studentType === "New Student") {
      createdStudent = await NewStudent.create(body);
    } else if (studentType === "transferee") {
      createdStudent = await Transferee.create(body);
    } else if (studentType === "Returning Student") {
      createdStudent = await Returning.create(body);
    } else if (studentType === "2nd Degree Taker") {
      createdStudent = await SecondDegreeTaker.create(body);
    }

    return { message: "success", data: createdStudent.studentType };
  } catch (error) {
    return {
      message: "error occured",
      error: error.message,
    };
  }
};

const fetchNew = async () => {
  try {
    const fetch = await NewStudent.findAll({
      where: {
        status: "active",
      },
    });
    if (fetch.length == 0) {
      return {
        message: "No new students found", // Change this line
        data: [], // Ideally, return an empty array, not a placeholder object
        availableSlots: [], // Or specific empty slots if applicable
      };
    }

    return {
      message: "fetch successfully",
      data: fetch,
    };
  } catch (error) {
    return {
      message: "An error occured",
      error: error.message,
    };
  }
};
const fetchSecond = async () => {
  try {
    const fetch = await SecondDegreeTaker.findAll({
      where: {
        status: "active",
      },
    });
    if (fetch.length == 0) {
      return {
        message: "No second degree students found", // Change this line
        data: [], // Ideally, return an empty array, not a placeholder object
        availableSlots: [], // Or specific empty slots if applicable
      };
    }

    return {
      message: "fetch successfully",
      data: fetch,
    };
  } catch (error) {
    return {
      message: "An error occured",
      error: error.message,
    };
  }
};
const fetchReturning = async () => {
  try {
    const fetch = await Returning.findAll({
      where: {
        status: "active",
      },
    });
    if (fetch.length == 0) {
      return {
        message: "No Returning students found", // Change this line
        data: [], // Ideally, return an empty array, not a placeholder object
        availableSlots: [], // Or specific empty slots if applicable
      };
    }

    return {
      message: "fetch successfully",
      data: fetch,
    };
  } catch (error) {
    return {
      message: "An error occured",
      error: error.message,
    };
  }
};
const fetchAdmission = async () => {
  try {
    const fetch = await Admissiontakers.findAll({
      where: {
        status: "active",
      },
    });
    if (fetch.length == 0) {
      return {
        message: "No admission taker students found", // Change this line
        data: [], // Ideally, return an empty array, not a placeholder object
        availableSlots: [], // Or specific empty slots if applicable
      };
    }

    return {
      message: "fetch successfully",
      data: fetch,
    };
  } catch (error) {
    return {
      message: "An error occured",
      error: error.message,
    };
  }
};
const archivedNew = async ({ id }) => {
  try {
    if (!Array.isArray(id) || id.length === 0) {
      throw new Error("ID must be a non-empty array.");
    }

    const toArchived = await NewStudent.update(
      { status: "archive" },
      {
        where: {
          id: { [Op.in]: id }, // ✅ Correct usage
        },
      }
    );

    return {
      message: "success",
      affectedRows: toArchived[0], // Sequelize update() returns [affectedRows]
    };
  } catch (error) {
    return {
      message: "An error occurred",
      error: error.message,
    };
  }
};

const archivedReturning = async ({ id }) => {
  try {
    if (!Array.isArray(id) || id.length === 0) {
      throw new Error("ID must be a non-empty array.");
    }

    const toArchived = await Returning.update(
      { status: "archive" },
      {
        where: {
          id: { [Op.in]: id }, // ✅ Correct usage
        },
      }
    );

    return {
      message: "success",
      affectedRows: toArchived[0], // Sequelize update() returns [affectedRows]
    };
  } catch (error) {
    return {
      message: "An error occurred",
      error: error.message,
    };
  }
};

const approveNew = async ({ id, examSchedule }) => {
  try {
    // Ensure `id` is an array
    if (!Array.isArray(id) || id.length === 0) {
      throw new Error("ID must be a non-empty array.");
    }

    // Find all matching records
    const matchedRecords = await NewStudent.findAll({
      where: { id: { [Op.in]: id } },
    });

    if (!matchedRecords.length) {
      throw new Error("No matching records found.");
    }

    // Find latest admissionNumber
    const latestAdmission = await Admissiontakers.findOne({
      order: [["admissionNumber", "DESC"]],
    });

    let nextAdmissionNumber = 1;
    if (latestAdmission) {
      nextAdmissionNumber = latestAdmission.admissionNumber + 1;
    }

    // Create new records in Admissiontakers
    const newAdmissions = await Admissiontakers.bulkCreate(
      matchedRecords.map((record, index) => ({
        fname: record.firstName,
        mname: record.middleName,
        lname: record.lastName,
        email: record.email,
        examSchedule: examSchedule || null, // Ensure correct data type
        admissionNumber: nextAdmissionNumber + index, // Increment admission number
      }))
    );

    await NewStudent.update(
      {
        status: "scheduled",
      },
      {
        where: {
          id: { [Op.in]: id },
        },
      }
    );

    return { message: "success", data: newAdmissions };
  } catch (error) {
    return { message: "An error occurred", error: error.message };
  }
};
const approveTransferee = async ({ id, examSchedule }) => {
  try {
    // Ensure `id` is an array
    if (!Array.isArray(id) || id.length === 0) {
      throw new Error("ID must be a non-empty array.");
    }

    // Find all matching records
    const matchedRecords = await Transferee.findAll({
      where: { id: { [Op.in]: id } },
    });

    if (!matchedRecords.length) {
      throw new Error("No matching records found.");
    }

    // Find latest admissionNumber
    const latestAdmission = await Admissiontakers.findOne({
      order: [["admissionNumber", "DESC"]],
    });

    let nextAdmissionNumber = 1;
    if (latestAdmission) {
      nextAdmissionNumber = latestAdmission.admissionNumber + 1;
    }

    // Create new records in Admissiontakers
    const newAdmissions = await Admissiontakers.bulkCreate(
      matchedRecords.map((record, index) => ({
        fname: record.firstName,
        mname: record.middleName,
        lname: record.lastName,
        email: record.email,
        examSchedule: examSchedule || null, // Ensure correct data type
        admissionNumber: nextAdmissionNumber + index, // Increment admission number
      }))
    );

    await Transferee.update(
      {
        status: "scheduled",
      },
      {
        where: {
          id: { [Op.in]: id },
        },
      }
    );

    return { message: "success", data: newAdmissions };
  } catch (error) {
    return { message: "An error occurred", error: error.message };
  }
};

const approveSecond = async ({ id, examSchedule }) => {
  try {
    // Ensure `id` is an array
    if (!Array.isArray(id) || id.length === 0) {
      throw new Error("ID must be a non-empty array.");
    }

    // Find all matching records
    const matchedRecords = await SecondDegreeTaker.findAll({
      where: { id: { [Op.in]: id } },
    });

    if (!matchedRecords.length) {
      throw new Error("No matching records found.");
    }

    // Find latest admissionNumber
    const latestAdmission = await Admissiontakers.findOne({
      order: [["admissionNumber", "DESC"]],
    });

    let nextAdmissionNumber = 1;
    if (latestAdmission) {
      nextAdmissionNumber = latestAdmission.admissionNumber + 1;
    }

    // Create new records in Admissiontakers
    const newAdmissions = await Admissiontakers.bulkCreate(
      matchedRecords.map((record, index) => ({
        fname: record.firstName,
        mname: record.middleName,
        lname: record.lastName,
        email: record.email,
        examSchedule: examSchedule || null, // Ensure correct data type
        admissionNumber: nextAdmissionNumber + index, // Increment admission number
      }))
    );

    await SecondDegreeTaker.update(
      {
        status: "scheduled",
      },
      {
        where: {
          id: { [Op.in]: id },
        },
      }
    );

    return { message: "success", data: newAdmissions };
  } catch (error) {
    return { message: "An error occurred", error: error.message };
  }
};

const changeSchedule = async ({ id, examSchedule }) => {
  try {
    if (!Array.isArray(id) || id.length === 0) {
      throw new Error("ID must be a non-empty array.");
    }

    const toArchived = await Admissiontakers.update(
      { examSchedule: examSchedule },
      {
        where: {
          id: { [Op.in]: id }, // ✅ Correct usage
        },
      }
    );

    return {
      message: "success",
      affectedRows: toArchived[0], // Sequelize update() returns [affectedRows]
    };
  } catch (error) {
    return {
      message: "An error occurred",
      error: error.message,
    };
  }
};
const fetchTransferee = async () => {
  try {
    const fetch = await Transferee.findAll({
      where: {
        status: "active",
      },
    });
    // Inside your fetchTransferee function:
    if (fetch.length == 0) {
      return {
        message: "No transfer students found", // Change this line
        data: [], // Ideally, return an empty array, not a placeholder object
        availableSlots: [], // Or specific empty slots if applicable
      };
    }

    return {
      message: "fetch successfully",
      data: fetch,
    };
  } catch (error) {
    return {
      message: "An error occured",
      error: error.message,
    };
  }
};

const archivedTransferee = async ({ id }) => {
  try {
    if (!Array.isArray(id) || id.length === 0) {
      throw new Error("ID must be a non-empty array.");
    }

    const toArchived = await Transferee.update(
      { status: "archive" },
      {
        where: {
          id: { [Op.in]: id }, // ✅ Correct usage
        },
      }
    );

    return {
      message: "success",
      affectedRows: toArchived[0], // Sequelize update() returns [affectedRows]
    };
  } catch (error) {
    return {
      message: "An error occurred",
      error: error.message,
    };
  }
};
const archivedSecond = async ({ id }) => {
  try {
    if (!Array.isArray(id) || id.length === 0) {
      throw new Error("ID must be a non-empty array.");
    }

    const toArchived = await SecondDegreeTaker.update(
      { status: "archive" },
      {
        where: {
          id: { [Op.in]: id }, // ✅ Correct usage
        },
      }
    );

    return {
      message: "success",
      affectedRows: toArchived[0], // Sequelize update() returns [affectedRows]
    };
  } catch (error) {
    return {
      message: "An error occurred",
      error: error.message,
    };
  }
};
const archivedAdmission = async ({ id }) => {
  try {
    if (!Array.isArray(id) || id.length === 0) {
      throw new Error("ID must be a non-empty array.");
    }

    const toArchived = await Admissiontakers.update(
      { status: "archive" },
      {
        where: {
          id: { [Op.in]: id }, // ✅ Correct usage
        },
      }
    );

    return {
      message: "success",
      affectedRows: toArchived[0], // Sequelize update() returns [affectedRows]
    };
  } catch (error) {
    return {
      message: "An error occurred",
      error: error.message,
    };
  }
};

module.exports = {
  submit,
  fetchNew,
  archivedNew,
  approveNew,
  fetchTransferee,
  archivedTransferee,
  approveTransferee,
  fetchSecond,
  archivedSecond,
  approveSecond,
  fetchReturning,
  fetchAdmission,
  changeSchedule,
  archivedAdmission,
  archivedReturning,
};
