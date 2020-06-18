'use strict';

var response = require('../res');
var connection = require('../conn');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
require('dotenv')

var getHashedPassword = (password) => {
    var sha256 = crypto.createHash('sha256');
    var hash = sha256.update(password).digest('base64');
    return hash;
}

var generateAuthToken = (un) => {
    var token = jwt.sign({username: un}, process.env.JWT_KEY, {expiresIn: "120000"});
    return token;
}

exports.readUsers = function(req, res) {
    try{
        connection.query('SELECT * FROM Users', function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError('Bad Request', res);
    }
};

exports.readOneUser = function(req, res) {
    var username = req.params.username;

    try{
        connection.query('SELECT * FROM Users WHERE username = ?',
        [ username ],
        function(error, rows, fields){
            if(error){
                response.internalError(error, res);
            }else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError('Bad Request', res);
    }
}

exports.createUsers = function(req, res) {

    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;

    var hashPasswd = getHashedPassword(password);

    try {
        // INSERT INTO query
        connection.query('INSERT INTO Users (phone, email, password, username) values (?,?,?,?)',
        [ phone, email, hashPasswd, username],
        function (error, rows, fields){
            if(error){
                // error to the log
                response.internalError(error.code, res);
            } else{
                // success message
                response.ok("Operation Success", res);
            }
        });
    } catch (error){
        response.clientError("Bad Request",res);
    }
};


exports.updateUsers = function(req, res) {

    var full_name = req.body.full_name;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    var avatar = req.body.avatar;
    var status = req.body.status;
    var organization = req.body.organization;
    var position = req.body.position;
    var username = req.body.username;
    var id = req.body.id;

    try{
        connection.query('UPDATE Users SET full_name = ?, phone = ?, email = ?, password = ?, avatar = ?, status = ?, organization = ?, position = ?, username = ? WHERE id = ?',
        [ full_name, phone, email, password, avatar, status, organization, position, username, id ],
        function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
            } else{
                response.ok("Berhasil merubah user!", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.deleteUsers = function(req, res) {

    var id = req.params.id;

    try{
        connection.query('DELETE FROM Users WHERE use_id = ?',
        [ id ],
        function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok("Berhasil menghapus user!", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.loginUsers = function(req, res) {
    // requests username and password
    var username = req.body.username;
    var password = req.body.password;

    var token = generateAuthToken(username);

    try{
        // SELECT password query
        connection.query('SELECT password FROM Users WHERE username = ?',
        [ username ],
        function(error, rows, fields){
            if(error){
                response.internalError("Internal server error",res);
            }else{
                // puts query result rows to const
                const pw = rows;

                // checks if password requested match
                const match = pw.find(p => {
                    return p.password === getHashedPassword(password);
                });

                // success message or fail message
                if(match){

                    connection.query('UPDATE Users SET token = ? WHERE username = ? AND password = ?',
                    [ token, username, getHashedPassword(password) ],
                    function(error, rows, fields) {
                        if(error){
                            response.internalError("Operation Failed",res);
                        }
                    });
                    response.ok("logged in",res);
                }else{
                    response.clientError("Password not match!",res);
                }
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
}

exports.getToken = function(req, res) {
    var username = req.params.username;

    try{
        connection.query('SELECT use_id, token FROM Users WHERE username = ?',
        [ username ],
        function(error, rows, fields){
            if(error){
                response.internalError("Internal server error",res);
            }else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.internalError("Bad Request",res);
    }
}
