import mongoose from 'mongoose';

const EmpresaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "The name is required"],
  },
  levelImpact: {
    type: Number,
    required: [true, "The level of impact is required"],
  },
  yearsTrayectory: {
    type: Number,
    required: [true, "The years of trayectory is required"],
  },
  categoria: {
    type: String,
    required: [true, "The category is required"],
  },
  estado: {
    type: Boolean,
    default: true,
  }
});

EmpresaSchema.methods.toJSON = function(){
  const { __v, _id, ...empresa} = this.toObject();
  empresa.uid = _id;
  return empresa;
}

export default mongoose.model('Empresa', EmpresaSchema);