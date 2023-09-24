const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true, 
      },
      password: {
        type: String,
        required: true,
      },
      
});
// Middleware function
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`);
  }
  next();
});

const InstaUser = new mongoose.model("InstaUser", userSchema);

module.exports = InstaUser;