const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const ContactShema =new Schema({
    nombre: String,
    organizacion:String,
    cel:String,
    numCel:Number,
    correo:String,
    mail: String,
    direccion:String,
    fecha:String,
    relacion:String
});
module.exports=mongoose.model('contacts',ContactShema);