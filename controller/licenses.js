'use strict';

var response = require('../res');
var connection = require('../conn');
var header = require('../header');

exports.readLicenses = function(req, res) {
    try{
        connection.query('SELECT * FROM Licenses'
        ,function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.readUserLicenses = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var user_id = req.params.user_id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                if(decoded.payload.user_id!=id){
                    response.credErr('Access Denied',res);
                }else{
                    connection.query('SELECT * FROM Licenses WHERE user_id = ?',
                    [user_id],
                    function (error, rows, fields){
                        if(error){
                            response.internalError(error, res);
                        } else{
                            response.ok(rows, res);
                        }
                    });
                }
            }
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};

exports.createLicenses = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var issue_date = req.body.issue_date;
        var exp_date = req.body.exp_date;
        var organization = req.body.organization;
        var description = req.body.description;
        var credential = req.body.credential;
        var user_id = req.body.user_id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                if(decoded.payload.user_id!=id){
                    response.forbidden('forbidden',res);
                }else{
                    connection.query('INSERT INTO Licenses (name, issue_date, exp_date, organization, description, credential, user_id) values (?,?,?,?,?,?,?)',
                    [ name, issue_date, exp_date, organization, description, credential, user_id ],
                    function (error, rows, fields){
                        if(error){
                            response.internalError(error, res);
                        } else{
                            response.ok("Operation Success!", res);
                        }
                    });
                }
            }
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};

exports.deleteLicenses = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('SELECT user_id FROM Licenses WHERE lic_id = ?',
                [ id ],
                function(error, rows, field){
                    if(error){
                        next();
                    }else{
                        var user_id = String(rows[0].user_id);
                        if(decoded.payload.user_id!=user_id){
                            response.credErr('Access Denied', res);
                        }else{
                            connection.query('DELETE FROM Licenses WHERE lic_id = ?',
                            [ id ],
                            function (error, rows, fields){
                                if(error){
                                    response.internalError(error, res)
                                } else{
                                    response.ok("Operation Success", res)
                                }
                            });
                        }
                    }
                });
            }
        }catch(err){
            response.clientError('Bad Request', res);
        }
    }
};
