import Empresa from './empresa.model.js';
import exceljs from 'exceljs';


export const empresaPost = async (req, res) => {

    const { nombre, levelImpact, yearsTrayectory, categoria } = req.body;

    const empresa = new Empresa({ nombre, levelImpact: parseInt(levelImpact), yearsTrayectory: parseInt(yearsTrayectory), categoria }); //lquiyuch

    await empresa.save();

    res.status(200).json({
        empresa
    });
}

export const empresaGet = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

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
    const { id } = req.params;
    const empresa = await Empresa.findOne({ _id: id });

    res.status(200).json({
        empresa
    })
}

export const empresaPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    await Empresa.findByIdAndUpdate(id, resto);

    const empresa = await Empresa.findOne({ _id: id });

    res.status(200).json({
        msg: 'Update Empresa',
        empresa
    });
}

// filtros y orden de empresas

export const empresaGetByYear = async (req, res) => {
    const { years } = req.params;
    const { limite, desde } = req.query;
    const query = { estado: true, yearsTrayectory: years };

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
    const { limite, desde } = req.query;
    const query = { estado: true, categoria: category };

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

export const empresaGetFromA_Z = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, empresas] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
            .sort({ nombre: 1 })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        empresas
    });
}

export const empresaGetFromZ_A = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, empresas] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
            .sort({ nombre: -1 })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        empresas
    });
}

//generador de excel
export const generarExcel = async (req, res) => {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Empresas');

    // Añadir filas y establecer valores
    worksheet.addRow(['Nombre', 'Impacto', 'Años de Trayectoria', 'Categoría']);

    const empresas = await Empresa.find();

    empresas.forEach(empresa => {
        const { nombre, levelImpact, yearsTrayectory, categoria } = empresa;
        worksheet.addRow([nombre, levelImpact, yearsTrayectory, categoria]);
    });

    worksheet.columns.forEach(column => {
        column.width = 25;
    });

    try {
        const archivoGenerado = 'empresas.xlsx';
        await workbook.xlsx.writeFile(archivoGenerado);
        
        res.status(200).json({
            msg: 'Archivo de Excel generado correctamente, revísalo en la carpeta del proyecto'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al generar el archivo de Excel, para realizar cambios es necesario que el archivo de Excel este cerrado'
        });
    }
}