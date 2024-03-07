import { Router } from 'express';
import { check } from 'express-validator';

import {existenteEmail, existeUsuarioById} from "../helpers/db-validators.js";
import {validarCampos} from "../middlewares/validar-campos.js";
import {validarJWT} from "../middlewares/validar-jwt.js";

import {
    usuariosGet,
    usuariosPost,
    getUsuarioById,
    UsuarioDelete,
    UsuarioPut,
} from './user.controller.js';

const router = Router();

router.get("/", usuariosGet);

router.get(
    "/:id",
    [
        check("id","This id is not valid").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,            
    ],getUsuarioById);


            
router.put(
    "/:id",
    [
        validarJWT,
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ],UsuarioPut);


    router.post(
        "/",
        [
            check("nombre", "The name cannot be empty").not().isEmpty(),
            check("password", "The password cannot be empty").not().isEmpty(),
            check("password", "The password must have minimmum 6 characters").isLength({min:6}),
            check("correo", "The email cannot be empty").not().isEmpty(),           
            check("correo", "Enter a valid email address").isEmail(),
            check("correo").custom(existenteEmail),        
             validarCampos,
       ],usuariosPost);


       router.delete(
        "/:id",
        [
            validarJWT,
            check("id", "This id is not valid").isMongoId(),
            check("id").custom(existeUsuarioById),
            validarCampos,
        ],UsuarioDelete);
    
        export default router;