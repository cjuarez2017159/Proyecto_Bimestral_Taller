import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usuariosGet = async(req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        users
    });
}

export const usuariosPost = async(req, res) => {
    const {nombre, correo, password} = req.body;
    const user = new User( {nombre, correo, password});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
}

export const getUsuarioById = async(req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    res.status(200).json({
        user
    })
}

export const UsuarioPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, resto);
    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msg: 'The user has been update',
        user
    });
}

export const UsuarioDelete = async (req = request, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { estado: false });
    const userAuthenticated = req.user;

    res.status(200).json({ msg: 'user has been removed', user, userAuthenticated });

}