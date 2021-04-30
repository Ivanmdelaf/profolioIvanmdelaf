const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/profile',{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err){
        throw err;
    }else{
        console.log('BBDD connected');
    }
});

module.exports = mongoose;