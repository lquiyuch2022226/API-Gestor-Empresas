import { Router } from 'express';
import { check } from 'express-validator';

import { existeEmpresaById } from "../helpers/db-validators.js";
import {
  empresaPost,
  empresaGet,
  getEmpresaById,
  empresaPut
} from './empresa.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "The name cannot be empty").not().isEmpty(),
    check("levelImpact", "The level of Impact cannot be empty").not().isEmpty(),
    check("yearsTrayectory", "The years of Trayectory cannot be empty").not().isEmpty(),
    check("categoria", "The category cannot be empty").not().isEmpty(),
    validarCampos,
  ],
  empresaPost
)

router.get("/",
  validarJWT,
  empresaGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "This isn't a valid ID").isMongoId(),
    check("id").custom(existeEmpresaById),
    validarCampos,
  ],
  getEmpresaById
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "This isn't a valid ID").isMongoId(),
    check("id").custom(existeEmpresaById),
    validarCampos,
  ],
  empresaPut
);

export default router;