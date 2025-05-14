import Userlist from "../models/dataSchema.js";

export const createUser = async (req, res) => {
  try {
    const {
      department,
      userrole,
      firstname,
      lastname,
      username,
      password,
      dob,
    } = req.body;

    const userId = req.user._id;
    console.log("userid:   ",userId);

    const newUserList = new Userlist({
      department,
      userrole,
      firstname,
      lastname,
      username,
      password,
      dob,
     user:userId,
    });

    const savedUserList = await newUserList.save();

    res.status(201).json({
        message: 'User created successfully',
        user: savedUserList,
      });

  } catch (error) {
    res.status(400).json({
        message: 'Error creating user',
        error: error.message,
      });
  }
};

export const getUser = async (req,res) =>{


try {
    const userList = await Userlist.find({user:req.user._id})
    
    res.status(200).json({
        list:userList,
        message:"Fetched Succesfully"
    })
} catch (error) {
    res.status(400).json({
        message: 'Error Loading user',
        error: error.message,
      });
}
}



export const editUser = async (req, res) => {
    const {id} = req.params;
    const updatedData = req.body;
    console.log(id)
    
      try {
        const updatedUser = await Userlist.findByIdAndUpdate(
          id,
          { $set: updatedData },
          { new: true, runValidators: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({
          message: "User updated successfully",
          user: updatedUser,
        });
      } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    
    
    };

export const deleteUser = async (req,res) =>{
    const {id} = req.params;

    try {
        
        const deleteUser = await Userlist.findByIdAndDelete(id)

        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
          }
      
          res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
