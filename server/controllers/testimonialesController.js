const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
};


exports.agregarTestimoniales = async (req, res) => {
    // console.log(req.body);
    let {nombre, correo, mensaje} = req.body

    let errores = []
    if(!nombre){
        errores.push({'mensaje': 'Agrega tu nombre'})
    }

    if(!correo){
        errores.push({'mensaje': 'Agrega tu correo'})
    }

    if(!mensaje){
        errores.push({'mensaje': 'Agrega tu mensaje'})
    }

    //revisar por errores
    if(errores.length > 0){
        //Muestra la vista con errores
        const Testimoniales = await Testimonial.findAll()
        res.render('testimoniales',{
            errores,
            nombre,
            correo,
            mensaje
        })
    } else{
        //Almacenamos en la base de datos
        Testimonial.create({
            nombre,
            correo,
            mensaje
        }) 
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(err => console.log(err))
    }
}