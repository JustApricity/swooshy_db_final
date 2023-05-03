const passport = require('passport');
const {Strategy} = require('passport-local').Strategy;
const {User, Role} = require('../models');
const md5 = require('md5');

//authenticate function
async function verifyUser(username, password, done){
    //get user from db
    const user = await User.findOne({
        where: {
            email: username,
            password: md5(password)
        }
    });
    //if it doesn't match, call failure message
    if(!user){
        return done(null, false, {message: 'Incorrect email or password.'});
    }
    //passed authentication
    return done(false,{
        id: user.id,
    });
}

passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        verifyUser
    )
);

//verify user, turn into object, turn into cookie
passport.serializeUser(function(user, done){
    process.nextTick(function (){
        done(null, {id: user.id});
    });
});

//turn serialized back into object
passport.deserializeUser(async function(user, done){
    const userModel = await User.findByPk(user.id, {
        include: [
            'role'
        ]
    });
    process.nextTick(function (){
        return done(null, userModel);
    });
});

module.exports.passport = passport;