'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readReportU = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('SELECT * FROM Report_User', function (error, rows, fields){
                    if(error){
                        response.internalError(error, res);
                    } else{
                        response.ok(rows, res);
                    }
                });
            }
        }catch(err){
            response.clientError("Bad Request", res);
        }
    }
};

exports.readOneReportU = function(req, res) {
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
                connection.query('SELECT * FROM Report_User WHERE id = ?', [id]
                ,function (error, rows, fields){
                    if(error){
                        response.internalError(error, res);
                    } else{
                        response.ok(rows, res);
                    }
                });
            }
        }catch(err){
            response.clientError("Bad Request", res);
        }
    }
}

exports.createReportU = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var description = req.body.description;
        var reported_user = req.body.reported_user;
        var reporting_user = req.body.reporting_user;
        var status = req.body.status;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});
        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('INSERT INTO Report_User (name, description, reported_user, reporting_user) values (?,?,?,?)',
                [ name, description, reported_project, reporting_user],
                function (error, rows, fields){
                    if(error){
                        response.internalError(error, res);
                    } else{
                        response.ok("Operation Success!", res)
                    }
                });
            }
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};

exports.updateReportUStatus = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var status = req.body.status;
        var id = req.params.id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});
        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('UPDATE Report_User SET status = ? WHERE rproj_id = ?',
                [ status, id ],
                function (error, rows, fields){
                    if(error){
                        response.internalError(error, res);
                    } else{
                        response.ok("Operation Success!", res)
                    }
                });
            }
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
}

exports.deleteReportU = function(req, res) {
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
                connection.query('DELETE FROM Report_User WHERE id = ?',
                [ id ],
                function (error, rows, fields){
                    if(error){
                        response.internalError(error, res);
                    } else{
                        response.ok("Operation Success!", res)
                    }
                });
            }
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};
