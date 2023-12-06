const bcrypt = require("bcrypt");
const authentication = require("../Middleware/auth");
const userModel = require("../Model/baseModel");

// ========= USER SIGN_UP FUNC =====

const handleSignUP = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await userModel.create({
      name: userName,
      email: email,
      password: hashedPassword,
    });

    if (userCreated) {
      res.json({ status: true, message: "Registration Success please Login" });
    } else {
      return res.json({ status: false, message: "InComplete Registration" });
    }
  } catch (error) {
    res.status(500);
  }
};

// ========= USER LOGIN FUNC =====

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userModel.findOne({ email: email });
    if (!userData)
      return res.json({ status: false, message: "user not exists" });

    const hashedPassword = await bcrypt.compare(password, userData.password);
    if (!hashedPassword) {
      return res.json({
        status: false,
        message: "Password entered is incorrect",
      });
    }

    let token = authentication.generateToken(userData);
    res.json({ status: true, token, name: userData.name, id: userData._id });
  } catch (error) {
    res.status(500);
  }
};

// ========= USER DETAILS ==========
const userDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await userModel.findOne({ _id: id });
    if (user) {
      res.json({ user, status: true });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    res.status(500);
  }
};

// ================= UPDATE USER DETAILS ============
const updateDetails = async (req, res) => {
  try {
    const { image, phone, location, id } = req.body;
    const updatedData = await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { image: image, phone: phone, location: location } }
    );
    if (updatedData) {
      res.json({ status: true });
    } else {
      res.status(500);
    }
  } catch (error) {
    res.status(500);
  }
};

module.exports = { handleSignUP, userLogin, userDetails, updateDetails };
