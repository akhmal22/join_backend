'use strict';

module.exports = function(app) {

    var users = require('./controller/users');
    var skills = require('./controller/skills');
    var roles = require('./controller/roles');
    var projects = require('./controller/projects');
    var portfolios = require('./controller/portfolios');
    var licenses = require('./controller/licenses');
    var joinedProjects = require('./controller/joinedProjects');
    var experiences = require('./controller/experiences');
    var comments = require('./controller/comments');
    var collaborators = require('./controller/collaborators');
    var chats = require('./controller/chats');

    app.route('/users')
        .get(users.readUsers);

    app.get('/', function(req, res){
        res.send("Homepage")
    });

    app.route('/register')
        .post(users.createUsers);
};