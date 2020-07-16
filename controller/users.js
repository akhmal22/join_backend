'use strict';

var response = require('../res');
var connection = require('../conn');
var header = require('../header');

var getHashedPassword = (password) => {
    var sha256 = header.crypto.createHash('sha256');
    var hash = sha256.update(password).digest('base64');
    return hash;
}

var generateAuthToken = (un, id) => {
    var token = header.jwt.sign({username: un, user_id: id}, process.env.JWT_KEY, {expiresIn: "5h"});
    return token;
}

// debugging purposes
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
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var full_name = req.body.fullname;
        var organization = req.body.organization;
        var position = req.body.position;
        var description = req.body.description;
        var id = req.params.use_id;

        try{
            connection.query('UPDATE Users SET full_name = ?, organization = ?, position = ?, description = ?, date_modified = now() WHERE use_id = ?',
            [ full_name, organization, position, description, id ],
            function (error, rows, fields){
                if(error){
                    response.internalError(error, res);
                } else{
                    response.ok("Operation Success", res);
                }
            });
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};

exports.suspendUsers = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.use_id;
        var password = req.body.password;

        try{
            connection.query('SELECT password FROM Users WHERE use_id = ?',
            [ id ],
            function(error, rows, fields) {
                if(error){
                    response.internalError(error,res);
                }else{
                    // puts query result rows to const
                    const pw = rows;

                    // checks if password requested match
                    const match = pw.find(p => {
                        return p.password === getHashedPassword(password);
                    });
                    if(match){
                        connection.query('UPDATE Users SET status = 1, date_modified = now() WHERE use_id = ?',
                        [ id ],
                        function (error, rows, fields){
                            if(error){
                                response.internalError(error, res);
                            } else{
                                response.ok("Operation Success", res);
                            }
                        })
                    }else{
                        response.credErr("Password not match",res);
                    }
                }
            })
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
}

exports.deleteUsers = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.use_id;
        var password = req.body.password;

        try{
            connection.query('SELECT password FROM Users WHERE use_id = ?',
            [ id ],
            function(error, rows, fields) {
                if(error){
                    response.internalError("Internal server error",res);
                }else{
                    // puts query result rows to const
                    const pw = rows;

                    // checks if password requested match
                    const match = pw.find(p => {
                        return p.password === getHashedPassword(password);
                    });
                    if(match){
                        connection.query('DELETE FROM Users WHERE use_id = ?',
                        [ id ],
                        function (error, rows, fields){
                            if(error){
                                response.internalError(error, res);
                            } else{
                                response.ok("Operation Success", res);
                            }
                        })
                    }else{
                        response.credErr("Password not match",res);
                    }
                }
            })
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};

exports.loginUsers = function(req, res) {
    // requests username and password
    var username = req.body.username;
    var password = req.body.password;

    try{
        // SELECT password query
        connection.query('SELECT password, status FROM Users WHERE username = ?',
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

                const isSuspend = pw.find(s => {
                    return s.status === 1;
                })

                // success message or fail message
                if(match && !isSuspend){
                    connection.query('SELECT use_id FROM Users WHERE username = ?',
                    [ username ],
                    function(error, rows, fields){
                        if(error){
                            response.internalError("Operation Failed",res);
                        }else{
                            var id = String(rows[0].use_id);
                            var token = generateAuthToken(username, id);

                            connection.query('UPDATE Users SET token = ? WHERE username = ? AND password = ?',
                            [ token, username, getHashedPassword(password) ],
                            function(error, rows, fields) {
                                if(error){
                                    response.internalError("Operation Failed",res);
                                }
                            });
                            response.ok("logged in",res);
                        }
                    })
                }else if(isSuspend){
                    response.credError("User suspended",res);
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
