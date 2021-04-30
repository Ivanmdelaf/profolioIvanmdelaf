const router = require('express').Router();
const users = require('../models/users');
const flash = require('connect-flash');

///////////////////////////////////////////////////////////
router.get('/',(req,res,next)=>{
    const success = req.flash('success',req.session.user);
    res.render('index',{success});
});
router.get('/login',(req,res)=>{
    res.render('login',({title:"LogIn",action:'/login'}));
})
router.post('/login',(req,res)=>{
    const {email,password} = req.body;

    users.find({email:email}).exec((err,user)=>{
        if(!err){
            console.log(user);
        }else if(!user){
            console.log(`We can not find any email:${email}`);
        }
    })
    res.redirect('/');
})
router.get('/signup',(req,res)=>{

    res.render('signup',({title:"SignUp",action:'/signup'}));
})
router.post('/signup',(req,res)=>{
    req.session.user = req.body;
    const {email}= req.body;
    users.findOne({email: email}).exec(async(err,user)=>{
        if(!user){
            const user = new users(req.body);
            await user.save((err)=>{
                if(!err){
                    console.log('Saved!');
                }
            });
            res.redirect('/signup');
        }else{
            if(err){
                console.log('Error');
            }
            res.render('signup',({title:"SignUp",action:'/signup'}));
        }
    });
    
})
///////////////////////////////////////////////////////////
//Errors Page
router.get('*',(req,res,next)=>{
   res.render('404');
})

module.exports = router;