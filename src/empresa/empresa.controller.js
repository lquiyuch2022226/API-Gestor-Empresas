import Empresa from './empresa.model.js';


export const empresaPost = async (req, res) => {

    const {nombre, levelImpact, yearsTrayectory, categoria} = req.body;
    const empresa = new Empresa( {nombre, levelImpact: parseInt(levelImpact), yearsTrayectory: parseInt(yearsTrayectory), categoria} );

    await empresa.save();

    res.status(200).json({
        empresa
    });
}

export const empresaGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, empresas] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        empresas
    });
}

export const getEmpresaById = async (req, res) => {
    const {id} = req.params;
    const empresa = await Empresa.findOne({_id: id});
    
    res.status(200).json({
        empresa
    })
}

export const empresaPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, ...resto} = req.body;

    await Empresa.findByIdAndUpdate(id, resto);

    const empresa = await Empresa.findOne({_id: id});

    res.status(200).json({
        msg: 'Update Empresa',
        empresa
    });
}

// filtros y orden de empresas

export const empresaGetByYear = async (req, res) => {
    const { years } = req.params;
    const {limite, desde} = req.query;
    const query = {estado: true, yearsTrayectory: years};

    const [total, empresas] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        empresas
    });
}

export const empresaGetByCategory = async (req, res) => {
    const { category } = req.params;
    const {limite, desde} = req.query;
    const query = {estado: true, categoria: category};

    const [total, empresas] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        empresas
    });
}