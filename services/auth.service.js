const User = require("../models/Users");

module.exports.CreateUser = async (data) => {
  return User.create(data)
    .then((result) => {
      return { status: true, result };
    })
    .catch((err) => {
      console.log(err);
      return { status: false, err };
    });
};

module.exports.checkMobile = async (data) => {
  return User.findOne(data)
    .then((result) => {
      return { status: true, result };
    })
    .catch((err) => {
      console.log(err);
      return { status: false, err };
    });
};

module.exports.checkEmail = async (data) => {
  return User.findOne(data)
    .then((result) => {
      return { status: true, result };
    })
    .catch((err) => {
      console.log(err);
      return { status: false, err };
    });
};

module.exports.getUser = async (data) => {
  return User.findOne(data)
    .then((result) => {
      return { status: true, result };
    })
    .catch((err) => {
      console.log(err);
      return { status: false, err };
    });
};

module.exports.DeleteUser = async (data) => {
  return User.findByIdAndUpdate(data)
    .then((result) => {
      return { status: true, result };
    })
    .catch((err) => {
      console.log(err);
      return { status: false, err };
    });
};
