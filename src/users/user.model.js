import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria'],
    },
    role: {
        type: String,
        require: true,
        default: "CLIENT_ROLE",
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJson = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema);