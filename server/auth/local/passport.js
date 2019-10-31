const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

function verifyPassword(password, user) {
    return (bcrypt.hashSync(password, user.salt) === user.hashedPassword)
}

exports.setup = function (User) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // 这是模型上的虚拟属性
    }, function (email, password, done) {
        User.findOne({
            email: email
        }, function (err, user) {
            if (err) { return done(err) }

            if (!user) {
                return done(null, false)
            }

            if (!verifyPassword(password, user)) {
                return done(null, false)
            }

             return done(null, user)
        })
    }
    ))
}