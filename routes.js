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

    app.route('/user/register')
        .post(users.createUsers);

    app.route('/user/login')
        .post(users.loginUsers);

    app.route('/user/token')
        .post(users.updateToken);

    app.route('/projects')
        .get(projects.readProjects);

    app.route('/project/register')
        .post(projects.createProjects)

    app.route('/project/:id')
        .put(projects.updateProjects)

    app.route('/project/:id')
        .delete(projects.deleteProjects)
};