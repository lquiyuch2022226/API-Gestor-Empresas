import { Router } from 'express';
import { check } from 'express-validator';

import { existeEmpresaById, existeEmpresaByName } from "../helpers/db-validators.js";
import {
  empresaPost,
  empresaGet,
  getEmpresaById,
  empresaPut,
  empresaGetByYear,
  empresaGetByCategory,
  empresaGetFromA_Z,
  empresaGetFromZ_A,
  generarExcel
} from './empresa.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "The name cannot be empty").not().isEmpty(),
    check("nombre").custom(existeEmpresaByName),
    check("levelImpact", "The level of Impact cannot be empty").not().isEmpty(),
    check("yearsTrayectory", "The years of Trayectory cannot be empty").not().isEmpty(),
    check("categoria", "The category cannot be empty").not().isEmpty(),
    validarCampos,
  ],
  empresaPost
)

router.get("/",
  validarJWT,
  empresaGet
);

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

router.get("/byYears/:years",
  validarJWT,
  empresaGetByYear
);

router.get("/byCategory/:category",
  validarJWT,
  empresaGetByCategory
);

router.get("/orderFrom/A_Z",
  validarJWT,
  empresaGetFromA_Z
);

router.get("/orderFrom/Z_A",
  validarJWT,
  empresaGetFromZ_A
);

router.get("/generar/Excel",
  validarJWT,
  generarExcel
);


export default router;