import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usuariosGet = async(req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estaod: true};

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        Use.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

export const usuariosPost = async(req, res) => {
    const {nombre, correo, password, role} = req.body;
    const usuario = new User( {nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    usuarios.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const getUsuarioById = async(req, res) => {
    
}