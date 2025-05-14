import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const hashPassword = async (userPass) => {
    const salt = await bcrypt.genSalt(10);
    const  hashedPassword = await bcrypt.hash(userPass,salt);
    return hashedPassword;
}

export const comparePassword = async (userPass,pass)=>{
    try {
        const isMatch = await bcrypt.compare(userPass,pass);
        return isMatch;
    } catch (error) {
        console.log(error)
    }
   
}

export const createJwt = (userId,res) =>{
    
    const jwtSign = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie('jwt',jwtSign,{
        httpOnly: true,
        secure: false, 
        sameSite: "Lax", 
        maxAge: 24 * 60 * 60 * 1000, 
      })


      return jwtSign
}
