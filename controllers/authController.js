const User = require('../models/User');
const jwt = require('jsonwebtoken');


//handle errors
const handleErrors = (err) => {
     console.log(err.message, err.code);
     let errors = { email: '', nickname: '', password: ''}


     // handle cuplicate error code
     if (err.code === 11000){
        console.log('duplicate')
        errors.email = 'that email is already registered';
        return errors;
     }
        //incorrect email 
    if (err.message === 'incorrect email'){
        errors.email = 'that email is not registered';
        return errors;
    }
    //incorrect password 
    if (err.message === 'incorrect password'){
        errors.password = 'that password is incorrect';
        return errors;
    }

     if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(properties => {
            errors[properties.path] = properties.message;
        })
     }

     return errors;
}

const maxAge = 3*24*60;
const createToken = (id) => {
    return jwt.sign({ id }, 'scolia-secret', {
        expiresIn: maxAge
    });
}

module.exports.register_get = (req, res) => {
    res.render('register');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.register_post = async (req, res) => {
    const { email, nickname, password } = req.body;
    
    try{
        const user = await User.create({ email, nickname, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true,maxAge:maxAge * 1000} )
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }

}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
   
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true,maxAge:maxAge * 1000} )
        res.status(200).json({ user:user._id })
    }catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors });
    }

}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');

}

