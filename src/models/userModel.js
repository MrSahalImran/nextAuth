import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: [true, "Username already exists"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter a email address"],
    unique: [true, "Email already exists"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpire: Date,
  verifyToken: String,
  verifyTokenExpire: Date,
});

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;
