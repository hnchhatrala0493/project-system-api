const UserService = require("../services/auth.service");
const Utility = require("../utility/helper");

exports.LoginWithEmail = async (req, res) => {
  const { login_type, email, password } = req.body;
  if (login_type === "email") {
    const checkEmail = await UserService.checkEmail({ email: email });
    if (checkEmail.status) {

      console.log(checkEmail);
    }
  } else {
    
  }
};

// exports.Register = async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     password,
//     email,
//     mobileNo,
//     dob,
//     gender,
//     office_mail,
//     AlternateMobileNo,
//   } = req.body;
//   if (
//     !firstName &&
//     !lastName &&
//     !password &&
//     !gender &&
//     !email &&
//     !office_mail &&
//     !mobileNo &&
//     !dob &&
//     !AlternateMobileNo
//   ) {
//     return res.status(401).json({
//       status: "401",
//       message: "All Field are required",
//     });
//   }
//   try {
//     const hashPassword = await Utility.GeneratePassword(password, 12);
//     const employeeId = await Utility.GenerateEmployeeId(firstName, lastName);
//     const uniqueUser = await UserService.checkMobile({ mobileNo: mobileNo });

//     if (uniqueUser.status) {
//       const user = {
//         EMP_ID: employeeId,
//         firstName: firstName,
//         lastName: lastName,
//         password: hashPassword,
//         email: email,
//         gender: gender,
//         mobileNo: mobileNo,
//         dob: dob,
//         AlternateMobileNo: AlternateMobileNo,
//       };
//       const create = await UserService.CreateUser(user);
//       return res.status(200).json({
//         status: true,
//         message: "User Registration Successfully",
//         result: create.result,
//       });
//     } else {
//       return res.status(200).json({
//         status: true,
//         message: "User Mobile no already registered.",
//         result: create.result,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal Server Error" + error });
//   }
// };
