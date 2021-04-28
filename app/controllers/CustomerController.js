const CustomerController = module.exports
//importando el modulo de la logica..
const CustomerService =  require('../services/CustomerService');
 
//los parametros req, res y next siempre son requeridos
//para el correcto funcionamiento del controlador,
//aca no va definido el path, se hace en otra parte.
CustomerController.delete = async (req, res, next) => {
    //extrayendo los PathParams de la peticion
    const params = req.params;

    try {
        //se supone que el el id llega asi /customers/:id (aca no es con {} si no con : )
        //await (ya que el metodo es async) para esperar que termine.
        await CustomerService.delete(params.id)

        //enviando respuesta al cliente (postman por ejemplo)
        res.send({message: 'customer deleted'})
        //------------------------------
    } catch(error) { //manejando las excepciones...
        console.log({error});
        //retornando al cliente(postman por ejemplo) el error..
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}
// PUT /customers/:id Body: datos a editar..
CustomerController.edit = async (req, res, next) => {
    const params = req.params;
    //extrayendo el body de la peticion
    const body = req.body;

    try {
        await CustomerService.edit(params.id, body)

        res.send({message: 'customer updated'})
        //------------------------------
    } catch(error) {
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}