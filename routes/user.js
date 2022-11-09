const express = require('express')
const router = express.Router();
const userDetails=require('../helpers/usermodel')
const message="invalid user name or password"
router.get('/', (req, res) => {
    
    let user=req.session.user
    console.log(user)
    if(user){
        res.render('user/home')
    }else{
        res.render('user/login')
    }  
})

router.get('/home', (req, res) => {
    let user=req.session.user
    console.log(user)
    if(user){
        res.render('user/home')
    }else{
        res.render('user/login')
    }  
})

router.get('/signup', (req, res) => {
    res.render('user/signup')
})


router.post('/signup', (req, res) => {
    console.log(req.body)
    userDetails.doSignup(req.body).then((data)=>{
        console.log(data)
        res.redirect('/')
        
    })
})
router.post('/login',(req, res)=>{
    userDetails.doLogin(req.body).then((response)=>{
        if(response.status){
            req.session.loggedIn=true
            console.log(req.session)
            req.session.user = response.user
            res.redirect('/home')
        }else{
            
            res.render('user/login',{message})
        }
    })
    
})
router.get('/signout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});



module.exports = router;




// SET PATH=C:\Program Files\Nodejs;%PATH%


