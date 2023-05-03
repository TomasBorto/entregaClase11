
const { userModel } = require("../models/users.model")

class UserManagerMongo{
    // constructor(){
    //     this.products = []
    // }
    getUsers = async ({ page, limit, query='' }) =>  {
        // const resp = await userModel.find({}).lean()
        const resp = await userModel.paginate({}, {limit, page, lean:true })
        // console.log(resp)
        return resp
    }

    getProductById = (id) => {
       
    }
    
    
    addUser = async (newItem) => {
        return await userModel.create(newItem) 
    }

    updateUser = async (uid, userToReplace) => {
        return await userModel.updateOne({_id: uid}, userToReplace)
    }

    deletUser = async (uid) => {
        // return await userModel.updateOne({_id: uid}, {status: false})
        return await userModel.deleteOne({_id: uid})
    }
       
}


module.exports = { UserManagerMongo }
