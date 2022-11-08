const db=require('../config/connection')
const collection=require('../config/collection')
const bcrypt=require('bcrypt')
module.exports={
    doSignup: (user) => {
        
        return new Promise(async (resolve, reject) => {
            user.password = await bcrypt.hash(user.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(user).then((data) => {
                resolve(data)
            })
        })
    }
    ,
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('login-success');
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('incorrect password');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('no user available ')
                resolve({status:false})
            }
        })
    }
   










    // addUser:(user,callback)=>{
    //     console.log(user);
    //     db.get().collection('user').insertOne(user).then((data)=>{
    //         callback(true)
    //     })
    // }
}