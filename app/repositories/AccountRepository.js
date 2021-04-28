const AccountRepository = module.exports
const DB = require('../config/database')

AccountRepository.listAccoutsByCustomer = (customerId) => {
    return DB('accounts').where({customerid : customerId}).select('*')
}

AccountRepository.create = (customer) => {
    return DB('accounts').insert(customer)
}