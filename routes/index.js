const express = require('express');
const router = express.Router();
const Contact= require('../models/contacts');
const fs = require('fs');
const  json_contacts = fs.readFileSync(__dirname+'/subida/conacts.json','utf-8');
//const json_contacts = fs.readFileSync('conacts.json', 'utf-8');
let contacts = JSON.parse(json_contacts);


router.get('/',async (req, res) => {
  const contactBd=await  Contact.find();
  res.render('index', { contacts });
});
router.get('/descargar/:id',function (req,res){
    res.download(__dirname+'/subida/'+req.params.id,
      req.params.id,function (err){
        if(err){
          console.log(err);
        }else{
          console.log("listo")
        }
      });

});
router.get('/add', (req, res) => {

  res.render('add');
});
router.get('/subir', (req, res) => {
  res.render('subir');
});
router.post('/Actualizar',async (req, res) => {
  const {  nombre, organizacion, cel, numCel, correo, mail,  direccion, fecha, relacion } = req.body;
  //const  contactBD=await  Contact.find(nombre);
 await Contact.updateMany({nombre:nombre},req.body);
  contacts.map(function (contact) {
    if(contact.nombre== nombre){
      contact.numCel = numCel;
      contact.organizacion=organizacion;
      contact.cel=cel;
      contact.numCel=numCel;
      contact.correo=correo;
      contact.mail=mail;
      contact.direccion=direccion;
      contact.fecha=fecha;
      contact.relacion=relacion;
    }

    return contact;
  });



  console.log(contacts)

  const json_contacts = JSON.stringify(contacts);
  fs.writeFileSync(__dirname+'/subida/conacts.json', json_contacts, 'utf-8');
  fs.writeFileSync(__dirname+'/subida/contacts.txt', json_contacts, 'utf-8');
  res.redirect('/')



});
router.get('/delete', (req, res) => {

  res.render('delete');
});
router.post('/delete',async (req, res) => {

  //const { mailBD } = req.query;


  const {mail}=req.body;
  await Contact.deleteMany({mail:mail});
  contacts.map(function (contact) {


    var index =contacts.indexOf(contact.mail);
    contacts.splice(index, 1);

    return contact;
  });

      router.post('/subir', (req, res) => {
return json_contacts
        });

  console.log(contacts)
  const json_contacts = JSON.stringify(contacts);
  fs.writeFileSync(__dirname+'/subida/conacts.json', json_contacts, 'utf-8');
  fs.writeFileSync(__dirname+'/subida/contacts.txt', json_contacts, 'utf-8');
  res.redirect('/')




});
router.get('/Actualizar', (req, res) => {
  res.render('Actualizar');
});
router.post('/add', async (req, res) => {
  const contactbd =new Contact(req.body);
  await contactbd.save( );


  const { nombre, organizacion, cel, numCel, correo, mail,  direccion, fecha, relacion} = req.body;



  var contact = {

    nombre,
    organizacion,
    cel,
    numCel,
    correo,
    mail,
    direccion,
    fecha,
    relacion
  };

  // add a new book to the array
  contacts.push(contact);

  // saving the array in a file
  const json_contacts = JSON.stringify(contacts);
  fs.writeFileSync(__dirname+'/subida/conacts.json', json_contacts, 'utf-8');
  fs.writeFileSync(__dirname+'/subida/contacts.txt', json_contacts, 'utf-8');
  res.redirect('/')


});



module.exports = router;