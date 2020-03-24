'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readJoinedProjects = function(req, res) {
    try{
        connection.query('SELECT * FROM JoinedProjects', function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.createJoinedProjects = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var parent_id = req.body.parent_id;
    var parent_idb = req.body.parent_idb;
    var parent_idc = req.body.parent_idc;
    var parent_idd = req.body.parent_idd;
    var child_id = req.body.child_id;

    try{
        if(parent_idd && parent_idc){
            connection.query('INSERT INTO JoinedProjects (name, description, parent_id, parent_idb, parent_idc, parent_idd, child_id) values (?,?,?,?,?,?,?)',
            [ name, description, parent_id, parent_idb, parent_idc, parent_idd, child_id ], 
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code, res);
                } else{
                    response.ok("Berhasil menambahkan user!", res)
                }
            });
        }else if(!parent_idc){
            connection.query('INSERT INTO JoinedProjects (name, description, parent_id, parent_idb, parent_idd, child_id) values (?,?,?,?,?,?)',
            [ name, description, parent_id, parent_idb, parent_idd, child_id ], 
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code, res);
                } else{
                    response.ok("Berhasil menambahkan user!", res)
                }
            });
        }else if(!parent_idd){
            connection.query('INSERT INTO JoinedProjects (name, description, parent_id, parent_idb, parent_idc, child_id) values (?,?,?,?,?,?)',
            [ name, description, parent_id, parent_idb, parent_idc, child_id ], 
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code, res);
                } else{
                    response.ok("Berhasil menambahkan user!", res)
                }
            });
        }else{
            connection.query('INSERT INTO JoinedProjects (name, description, parent_id, parent_idb, child_id) values (?,?,?,?,?,?,?)',
            [ name, description, parent_id, parent_idb, child_id ], 
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code, res);
                } else{
                    response.ok("Berhasil menambahkan user!", res)
                }
            });
        }
    }catch(err){
        response.clientError("Bad Request",res);
    }
};


exports.updateJoinedProjects = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var due_date = req.body.due_date;
    var num_req_collaborator = req.body.num_req_collaborator;
    var thumbnail = req.body.thumbnail;
    var status = req.body.status;
    var parent_id = req.body.parent_id;
    var child_id = req.body.child_id;
    var id = req.body.id;

    connection.query('UPDATE JoinedProjects SET name = ?, description = ?, due_date = ?, num_req_collaborator = ?, thumbnail = ?, status = ?, parent_id = ?, child_id = ? WHERE id = ?',
    [ name, description, due_date, num_req_collaborator, thumbnail, status, parent_id, child_id, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteJoinedProjects = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM JoinedProjects WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};