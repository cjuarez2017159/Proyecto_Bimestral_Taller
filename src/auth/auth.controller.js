import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js'; 

export const login = async (req, res) => {
    const { correo, password } = req.body;

  try {
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(400).json({
        msg: "The data you entered is incorrect, please enter existing data",
      });
    }
    if (!user.estado) {
      return res.status(400).json({
        msg: "The user does not exist in the database",
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "The password is incorrect        ",
      });
    }
    const token = await generarJWT( user.id);

    res.status(200).json({
      msg: 'Login Ok!!!',
      user,
      token
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Contact the administrator      ",
    });
  }
}