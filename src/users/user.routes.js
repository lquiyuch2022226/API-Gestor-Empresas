import { Router } from 'express';
import { check } from 'express-validator';

import { usuariosPost } from './user.controller.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    '/:id'
    );

router.post(
    "/",
    [
      check("nombre", "The name cannot be empty").not().isEmpty(),
      check("password", "The name cannot be empty").not().isEmpty(),
      check("password", "The password must have minimum 6 characters").isLength({ min: 6}),
      check("correo", "The email cannot be empty").not().isEmpty(),
      check("correo", "This isn't a email").isEmail(),
      check("correo").custom(existenteEmail),
      check("role").custom(esRoleValido),
      validarCampos,
    ],
    usuariosPost
)