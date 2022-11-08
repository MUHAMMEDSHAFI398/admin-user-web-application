const db=require('../config/connection')
const collection=require('../config/collection')
const objectId=require('mongodb').ObjectId

const bcrypt=require('bcrypt')

module.exports={
    getAllusers: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
     },
     deleteUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).deleteOne({ _id: objectId(userId) }).then((response) => {
                resolve(response)
            }).catch(err => reject(err))

        })
    },
    addUser: (user, callback) => {
        user.password = bcrypt.hash(user.password, 10)
        db.get().collection(collection.USER_COLLECTION).insertOne(user).then((data) => {
            callback(data)
        })
    },
    editUser:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(id)}).then((data)=>{
            resolve(data);
        }); 
        })
    },
    editUserDetails:(id,user)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(id)},{
                $set:{
                    name:user.name,
                    email:user.email
                }
            }).then((response)=>{
                resolve();
            });
        });
    }
   

   
}
