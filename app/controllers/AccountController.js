const AccountController = module.exports
//importando el modulo de la logica..
const AccountService =  require('../services/AccountService');

AccountController.listAccoutsByCustomer = async (req, res, next) => {
    const params = req.params;

    try {
        const response = await AccountService.listAccountsByCustomer(params.id)

        //enviando respuesta al cliente que retorna la logica
        res.send(response)
        //------------------------------
    } catch(error) { 
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}

AccountController.createAccount = async (req, res, next) => {
    const body = req.body;

    try {
        await AccountService.create(body)
        res.send({message: 'account created'})
        //------------------------------
    } catch(error) { 
        console.log({error});
        res.status(500).send({error: error.message}).end();
        next(error);
    }
}