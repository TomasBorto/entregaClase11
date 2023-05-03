
const { userModel } = require("../models/users.model")

class UserManagerMongo{
    // constructor(){
    //     this.products = []
    // }
    getUsers = async () =>  await userModel.find()

    getProductById = (id) => {
       
    }
    
    
    addProduct = (newItem) => {}
       
}


module.exports = { UserManagerMongo }

