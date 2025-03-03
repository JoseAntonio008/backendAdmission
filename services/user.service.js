const { signToken, hashedPassword, comparePassword } = require("../helpers/utils");
const { Admin } = require("../models");
const login = async (body) => {
  try {
    const { email, password } = body;

    const checkEmail = await Admin.findOne({
      where: {
        email,
      },
    });
    if (!checkEmail) {
      return {
        message: "no email found",
      };
    }
    if (!password) {
        return {
            message:"no password provided"
        }
    }
    const validatePass = await comparePassword(password, checkEmail.password);
    
    
    if (!validatePass) {
      return {
        message: "wrong password",
      };
    }
    const token = signToken({
      userID: checkEmail.id,
      fname: checkEmail.fname,
      mname: checkEmail.mname,
      lname: checkEmail.lname,
    });

    const updateToken = await Admin.update(
      {
        token,
      },
      {
        where: {
          email: checkEmail.email,
        },
      }
    );
    return {
      message: "login successful",
      token,
    };
  } catch (error) {
    return {
      message: "error occured",
      error,
    };
  }
};

const createAccount = async (body) => {
  try {
    const { email, fname, mname, lname, password } = body;

    const checkExist = await Admin.findOne({
      where: {
        email,
      },
    });

    if (checkExist) {
      return {
        message: "An Account is already Registered with this email",
      };
    }
    const hashpassword = await hashedPassword(password);
    const createAccount = await Admin.create({
      email,
      fname,
      mname,
      lname,
      password: hashpassword,
    });
    console.log(createAccount);

    return {
      message: "account created successfully",
    };
  } catch (error) {
    return {
      message: "An error occured",
      error: error.message,
    };
  }
};
module.exports = {
  login,
  createAccount,
};
