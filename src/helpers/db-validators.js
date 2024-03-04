import User from '../users/user.model.js';
import Empresa from '../empresa/empresa.model.js';

export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if (existeEmail){
        throw new Error(`This ${correo} is really used`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`A user with this ID: ${id} don't exists in database`);
    }
}

export const existeEmpresaById = async (id = '') => {
    const existeEmpresa = await Empresa.findById(id);
    if (!existeEmpresa){
        throw new Error(`A company with this ID: ${id} don't exists in database`);
    }
}

export const existeEmpresaByName = async (nombre = '') => {
     const empresaExistente = await Empresa.findOne({ nombre: nombre });
    if (empresaExistente){
        throw new Error(`This name: ${nombre} is already in used, try other name`);
    }
} 