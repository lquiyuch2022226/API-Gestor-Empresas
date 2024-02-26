import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js'; 

export const login = async (req, res) => {
    const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Incorrect credentials, this email isn't exists in database",
      });
    }
    //verificar si el ususario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "This user don't exists in database",
      });
    }
    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Incorrect password",
      });
    }
    //generar el JWT
    const token = await generarJWT( usuario.id);

    res.status(200).json({
      msg: 'Your login',
      usuario,
      token
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Talks to admin",
    });
  }
}