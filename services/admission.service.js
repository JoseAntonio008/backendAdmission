const { signToken } = require('../helpers/utils');
const { Admissiontakers} = require('../models')

const loginAdmission = async ({admissionNumber,lname}) => {
    try {
        const checkExist = await Admissiontakers.findOne({
            where:{
                admissionNumber
            }
        })
        if(!checkExist) throw new Error("no Examinee found with this number");
        if (checkExist.admissionNumber == admissionNumber && checkExist.lname == lname) {
            const token = signToken({
                userID: checkExist.admissionNumber,
                fname: checkExist.fname,
                mname: checkExist.mname,
                lname: checkExist.lname,
              });

              const updateToken = await Admissiontakers.update(
                {
                  token,
                },
                {
                  where: {
                    email: checkExist.email,
                  },
                }
              );
            return {
                message:"success login",
                token:token
            }
        }else{
            throw new Error("credentials does not match");
            
        }
        
    } catch (error) {
        return { 
            message:"an Error occured",
            error:error.message
        }
    }
}

module.exports = {
    loginAdmission
}