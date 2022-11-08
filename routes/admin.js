const express=require('express');
const async = require('hbs/lib/async');
const router=express.Router();
const adminDetails = require('../helpers/adminmodel')
const admin = { email: 'admin@gmail.com', password: 'pass' }
const errroeMessage = 'invalid username or password '

router.get('/',(req,res)=>{
    let admin=req.session.admin
    console.log(admin)
    if(admin){
        res.render('admin/adminhome')
    }else{
        res.render('admin/adminlogin') 
    }  
   })

router.get('/adminhome',(req,res)=>{
    
    let admin=req.session.admin
    console.log(admin)
    adminDetails.getAllusers().then((users)=>{
        if(admin){
            res.render('admin/adminhome',{users})
        }else{
            res.render('admin/adminlogin')
        } 

    })
    
})
router.post('/adminlogin',(req,res)=>{
    if (req.body.email === admin.email && req.body.password === admin.password) {
        console.log(req.body)
        req.session.admin = req.body.email
        res.redirect('/admin/adminhome')
    } else {
        res.render('admin/adminlogin',{errroeMessage})
        
    }
})
router.get('/delete-user/:id',(req,res)=>{
   
        let userId = req.params.id
        adminDetails.deleteUser(userId).then((response) => {
            console.log(response)
            res.redirect('/admin/adminhome')
        }).catch(err => console.log(err))
    
})
router.get('/add-users',(req,res)=>{  
    res.render('admin/addusers')
   
})
router.post('/add-users',(req,res)=>{ 

    console.log(req.body);
    adminDetails.addUser(req.body,(result)=>{
        res.render('admin/addusers')
        
    }) 
})




router.get('/edit-user/:id',async(req,res)=>{
     
    let user = await adminDetails.editUser(req.params.id);
    console.log(user)
    res.render('admin/edituser',{user})
     
    
})

router.post('/edit-user/:id',(req,res)=>{
    adminDetails.editUserDetails(req.params.id,req.body).then(()=>{
      res.redirect('/admin/adminhome');
    });
  });



router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin')
});



module.exports=router;