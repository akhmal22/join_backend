'use strict';

var response = require('../res');
var connection = require('../conn');

// debugging purposes
exports.readAllProjects = function(req, res){
    try{
        connection.query('SELECT name, Projects.date_created, description, type, duration, num_req_collaborator, username FROM Projects LEFT JOIN Users ON Projects.user_id = Users.use_id',
        function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError('Bad Request', res);
    }
}

// tested, proper
exports.readOwnedProjects = function(req, res) {
    var username = req.params.username;
    try{
        connection.query('SELECT * FROM Projects LEFT JOIN Users ON Projects.user_id = Users.use_id WHERE username = ?',
        [ username ],
        function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows,res);
            }
        });
    }catch(err){
        response.clientError('Bad Request', res);
    }
};

// tested, proper
exports.readOneProject = function(req, res) {
    var id = req.params.id;

    try{
        connection.query('SELECT * FROM Projects WHERE id = ?',
        [ id ],
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


exports.createProjects = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var description = req.body.description;
        var type = req.body.type;
        var duration = req.body.duration;
        var num_req_collaborator = req.body.num_req_collaborator;
        var user_id = req.body.user_id;

        var init_date = '2019-12-31';

        try{
            connection.query("INSERT INTO Projects (name, description, type, app_due_date, start_date, end_date, duration, num_req_collaborator, user_id) values (?,?,?,?,?, ADDDATE('2019-12-31', INTERVAL ? MONTH),?,?,?)",
            [ name, description, type, init_date, init_date, duration, duration, num_req_collaborator, user_id ],
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code, res)
                    console.log(error)
                } else{
                    response.ok("Operation Success", res)
                }
            });
        }catch(err){
            response.clientError('Bad Request', res);
        }
    }
};

// tested, proper
exports.updateProjects = function(req, res) {

    var description = req.body.description;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var app_due_date = req.body.app_due_date;
    var num_req_collaborator = req.body.num_req_collaborator;
    var thumbnail = req.body.thumbnail;
    var status = req.body.status;
    var id = req.params.id;

    try{
        connection.query('UPDATE Projects SET description = ?, start_date = ?, end_date = ?, app_due_date = ?, num_req_collaborator = ?, thumbnail = ?, status = ?, date_modified = now() WHERE id = ?',
        [ description, start_date, end_date, app_due_date, num_req_collaborator, thumbnail, status, id ],
        function (error, rows, fields){
            if(error){
                response.internalError(error, res)
                console.log(error)
            } else{
                response.ok("Operation Success", res)
            }
        });
    }catch(err){
        response.clientError('Bad Request', res);
    }
};

exports.updateDescription = function(req, res) {

    var description = req.body.description;
    var id = req.params.id;

    try{
        connection.query('UPDATE Projects SET description = ?, date_modified = now() WHERE id = ?',
        [ description, id ],
        function(error, rows, fields){
            if(error){
                response.internalError(error, res)
            }else{
                response.ok("Operation Success", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request", res);
    }
};

exports.updateStartDate = function(req, res) {

    var start_date = req.body.start_date;
    var id = req.params.id;

    try{
        connection.query('UPDATE Projects SET start_date = ?, date_modified = now() WHERE id = ?',
        [ start_date, id ],
        function(error, rows, fields){
            if(error){
                response.internalError(error, res)
            }else{
                response.ok("Operation Success", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request", res);
    }
};

exports.updateEndDate = function(req, res) {

    var end_date = req.body.end_date;
    var id = req.params.id;

    try{
        connection.query('UPDATE Projects SET end_date = ?, date_modified = now() WHERE id = ?',
        [ end_date, id ],
        function(error, rows, fields){
            if(error){
                response.internalError(error, res)
            }else{
                response.ok("Operation Success", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request", res);
    }
};

exports.updateDueDate = function(req, res) {

    var app_due_date = req.body.app_due_date;
    var id = req.params.id;

    try{
        connection.query('UPDATE Projects SET app_due_date = ?, date_modified = now() WHERE id = ?',
        [ app_due_date, id ],
        function(error, rows, fields){
            if(error){
                response.internalError(error, res)
            }else{
                response.ok("Operation Success", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request", res);
    }
};

exports.updateColl = function(req, res) {

    var num_req_collaborator = req.body.num_req_collaborator;
    var id = req.params.id;

    try{
        connection.query('UPDATE Projects SET num_req_collaborator = ?, date_modified = now() WHERE id = ?',
        [ num_req_collaborator, id ],
        function(error, rows, fields){
            if(error){
                response.internalError(error, res)
            }else{
                response.ok("Operation Success", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request", res);
    }
};

exports.updateStatus = function(req, res) {

    var status = req.body.status;
    var id = req.params.id;

    try{
        connection.query('UPDATE Projects SET status = ?, date_modified = now() WHERE id = ?',
        [ status, id ],
        function(error, rows, fields){
            if(error){
                response.internalError(error, res)
            }else{
                response.ok("Operation Success", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request", res);
    }
};

// tested, proper
exports.deleteProjects = function(req, res) {

    var id = req.params.id;

    try{
        connection.query('DELETE FROM Projects WHERE id = ?',
        [ id ],
        function (error, rows, fields){
            if(error){
                response.internalError(error, res)
            } else{
                response.ok("Operation Success", res)
            }
        });
    }catch(err){
        response.clientError('Bad Request', res);
    }
};
