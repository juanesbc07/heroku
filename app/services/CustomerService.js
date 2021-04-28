const CustomerService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

CustomerService.create = async (customer) => {
    //buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findById(customer.id)

    //si la lista de resultados su tamano es mayor que cero
    //es porque existe un cliente con esa cedula
    if(customerFound.length > 0) {
        throw new Error('Customer already exist')
    }

    //se crea el cliente
    await CustomerRepository.create(customer)
}

CustomerService.edit = async (id, customer) => {
    //buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findById(id)

    //si la lista de resultados su tamano es  cero
    //es porque no existe un cliente con esa cedula
    if(customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }

    //se actualiza el cliente
    await CustomerRepository.edit(id, customer)
}

CustomerService.delete = async (idCustomer) => {
    //se consultan las cuentas del cliente, se usa await porque debemos 
    // esperar ese resultado para poder seguir...
    const customerAccounts = await AccountRepository.listAccoutsByCustomer(idCustomer)

    //si el tamano de la lista es mayor a cero es porque tiene cuentas
    //y se lanza la excepcion
    if (customerAccounts.length > 0) {
        throw new Error('customer with accounts, can not be deleted')
    }

    //se elimina el cliente...
    await CustomerRepository.delete(idCustomer)
}

CustomerService.findCustomer = async(idCustomer) => {
    const customers = await CustomerRepository.findById(idCustomer)

    if (customers.length === 0) return undefined;

    return customers[0];
}


