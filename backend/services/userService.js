const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

// @desc     Register new user
// @route    POST /api/users/register
// @access   Public
exports.register = catchAsync(async (req, res, next) => {
  const { name, surname, email, password, phone } = req.body;

  if (!name || !surname || !email || !password || !phone) {
    return res.status(400).json({
      status: "error",
      message: "Prosze podać wszystkie wymagane dane do rejestracji",
    });
  }

  const newUser = await User.create({
    name,
    surname,
    email,
    password,
    phone,
  });

  newUser.password = undefined;
  newUser.isAdmin = undefined;
  newUser.createdAt = undefined;
  newUser.lastLogin = undefined;

  return res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.changeAddress = catchAsync(async (req, res, next) => {
  const { postalCode, city, street, houseNumber, apartmentNumber } = req.body;
  if (!postalCode || !city || (!houseNumber && !apartmentNumber)) {
    return res.status(400).json({
      status: "error",
      message: "Prosze podać wszystkie wymagane dane do rejestracji",
    });
  }
  const user = await User.findById(req.user._id);
  user.address = {
    postalCode,
    city,
    street,
    houseNumber,
    apartmentNumber,
  };
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// @desc     Login user
// @route    POST /api/users/login
// @access   Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Prosze podać wszystkie wymagane dane do logowania",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "error",
      message: "Niepoprawny email lub hasło",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000,
  });

  user.password = undefined;
  user.lastLogin = undefined;

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// @desc     Logout user
// @route    POST /api/users/logout
// @access   Private
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Wylogowano pomyślnie",
  });
});

// @desc     Get current user
// @route    GET /api/users/me
// @access   Private
exports.me = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// @desc     Update current user
// @route    PUT /api/users/me
// @access   Private
exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { name, surname, email, phone } = req.body;

  if (name) user.name = name;
  if (surname) user.surname = surname;
  if (email) user.email = email;
  if (phone) user.phone = phone;

  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// @desc     Delete current user
// @route    DELETE /api/users/me
// @access   Private
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// @desc     Get user by id
// @route    GET /api/users/:id
// @access   Admin
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// @desc     Update user by id
// @route    PUT /api/users/:id
// @access   Admin
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const { name, surname, email, phone } = req.body;

  if (name) user.name = name;
  if (surname) user.surname = surname;
  if (email) user.email = email;
  if (phone) user.phone = phone;

  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// @desc     Delete user by id
// @route    DELETE /api/users/:id
// @access   Admin
exports.deleteUser = catchAsync(async (req, res, next) => {
  if (req.params.id === req.user._id) {
    return res.status(403).json({
      status: "error",
      message:
        "Nie możesz usunąć swojego konta, jesteś administratorem. Swoje konto możesz usunąć tylko z poziomu bazy danych",
    });
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// @desc     Get all users
// @route    GET /api/users
// @access   Admin
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});
