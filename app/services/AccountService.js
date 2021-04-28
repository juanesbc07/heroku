const AccountService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

AccountService.listAccountsByCustomer = async (customerId) => {
    //buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findById(customerId)

    //si la lista de resultados su tamano es  cero
    //es porque no existe un cliente con esa cedula
    if(customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }

    //cuando se retorna directamente el resultado de una funcion que 
    //haya que esperar el resultado, no es necesario usar await..
    return AccountRepository.listAccoutsByCustomer(customerId)
}

AccountService.create = async (account) => {
    //buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findById(account.customerid)
console.log({customerFound, account})
    //si la lista de resultados su tamano es  cero
    //es porque no existe un cliente con esa cedula
    if(customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }

    //consultando las cuentas del cliente..., el id del cliente viene en el objeto customer..
    const accountsByCustomer = await AccountRepository.listAccoutsByCustomer(account.customerid)

    //verificando que solo tenga hasta tres...
    if (accountsByCustomer.length >= 3) {
        throw new Error('no more than 3 accounts...')
    }

    account.openedat = new Date();//colocando la fecha de apertura
    account.amount = 0; //colocando el saldo inicial
    await AccountRepository.create(account)
}