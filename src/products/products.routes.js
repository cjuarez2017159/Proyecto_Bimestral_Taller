import mongoose from 'mongoose';

const CategoriaSchema = mongoose.Schema({

    nombreCategoria: {
        type: String,
        required: [true, 'The name of the category is required']
    },
    descripcion: {
        type: String,
        required: [true, 'The descripction of the category is required']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

CategoriaSchema.methods.toJSON = function () {
    const { __v, _id, ...categoria } = this.toObject();
    categoria.categoria_id = _id;
    return categoria;
};

export default mongoose.model('Categoria', CategoriaSchema);