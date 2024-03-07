import jwt from 'jsonwebtoken'
import User from '../users/user.model.js'

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SERCRETEORPRIVATEKEY);
    const user = await User.findById(uid);

    if(!user){
      return res.status(401).json({
        msg: 'User does not exist in the database'
      })
    }

    if(!user.estado){
      return res.status(401).json({
        msg: 'Invalid token'
      })
    }

    req.user = user;
    next();
    
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Invalid Token",
      });
  }
}