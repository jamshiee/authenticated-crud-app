import mongoose from "mongoose";

const userList = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
    },
    userrole: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const Userlist = mongoose.model("Userlist", userList);
export default Userlist;

/* 

 
*/