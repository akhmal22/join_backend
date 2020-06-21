'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readReportP = function(req, res) {
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
                connection.query('SELECT * FROM Report_Project', function (error, rows, fields){
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

exports.readOneReportP = function(req, res) {
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
                connection.query('SELECT * FROM Report_Project WHERE id = ?', [id]
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

exports.createReportP = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var description = req.body.description;
        var reported_project = req.body.reported_project;
        var reporting_user = req.body.reporting_user;
        var status = req.body.status;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});
        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('INSERT INTO Report_Project (name, description, reported_project, reporting_user) values (?,?,?,?)',
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

exports.updateReportPStatus = function(req, res) {
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
                connection.query('UPDATE Report_Project SET status = ? WHERE rproj_id = ?',
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

exports.deleteReportP = function(req, res) {
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
                connection.query('DELETE FROM Report_Project WHERE id = ?',
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
