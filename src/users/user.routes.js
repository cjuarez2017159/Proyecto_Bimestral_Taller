import { Router } from 'express';
import { check } from 'express-validator';
import {
    usuariosGet,
    usuariosPost,
    getUsuarioById,
    usuariosPut,
    usuariosDelete,
} from './user.controller.js';

