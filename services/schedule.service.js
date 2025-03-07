const { Schedule } = require("../models");
const { Op } = require("sequelize");
const { isBefore, isAfter, isEqual, parseISO,isValid } = require("date-fns");

const fetchSchedule = async () => {
  try {
    const result = await Schedule.findAll({
      where: {
        status: "active",
      },
    });

    return {
      message: "fetch successfully",
      data: result,
    };
  } catch (error) {
    console.log(`error in schedule Fetch: ${error}`);

    return {
      message: "An Error Occured",
      error: error,
    };
  }
};
const createSchedule = async ({ dateTime, location, description }) => {
  try {
    console.log("Received dateTime:", dateTime, "Type:", typeof dateTime);

    if (!dateTime) {
      throw new Error("dateTime is required.");
    }

    let newDate;
    if (typeof dateTime === "string") {
      newDate = parseISO(dateTime);
    } else if (dateTime instanceof Date) {
      newDate = dateTime;
    } else {
      throw new Error("Invalid date format. Expected a string or Date object.");
    }

    if (!isValid(newDate)) {
      throw new Error(
        "Invalid date format. Ensure dateTime is in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)"
      );
    }

    console.log("Parsed date:", newDate);

    // Check for overlapping schedules
    const existingSchedules = await Schedule.findAll({ where: { location } });

    const isOverlapping = existingSchedules.some((schedule) => {
      if (!schedule.dateTime) return false;
      const existingDate = new Date(schedule.dateTime); // Ensure it's a Date object
      return isEqual(newDate, existingDate);
    });

    if (isOverlapping) {
      throw new Error(
        "Schedule overlaps with an existing event at this location."
      );
    }

    // Create new schedule
    const result = await Schedule.create({
      dateTime: newDate,
      location,
      description,
    });

    return { message: "success", data: result };
  } catch (error) {
    return { message: "An error occurred", error: error.message };
  }
};

module.exports = {
  fetchSchedule,
  createSchedule,
};
