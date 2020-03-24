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


    // user
    app.route('/user/register')
        .post(users.createUsers);

    app.route('/user/login')
        .post(users.loginUsers);

    app.route('/user/token')
        .put(users.updateToken);

    
    // project
    app.route('/projects')
        .get(projects.readProjects);

    app.route('/project/register')
        .post(projects.createProjects)

    app.route('/project/:id')
        .put(projects.updateProjects)

    app.route('/project/:id')
        .delete(projects.deleteProjects)


    // collaborators
    app.route('/project/:id/apply')
        .post(collaborators.createCollaborators)

    app.route('/project/:id/applicant')
        .get(collaborators.readCollaborators)

    app.route('/project/:id/applicant/accept')
        .put(collaborators.updateCollaborators)
    
    app.route('/project/:id/applicant/reject')
        .delete(collaborators.deleteCollaborators)

    
    // experiences
    app.route('/user/experiences/register')
        .post(experiences.createExperiences)

    app.route('/user/experiences/')
        .get(experiences.readExperiences)
    

    // skills
    app.route('/user/skills/register')
        .post(skills.createSkills)

    app.route('/user/skills/')
        .get(skills.readSkills)


    // portfolios
    app.route('/user/portfolios/register')
        .post(portfolios.createPortfolios)

    app.route('/user/portfolios/')
        .get(portfolios.readPortfolios)
    

    // licenses
    app.route('/user/licenses/register')
        .post(licenses.createLicenses)

    app.route('/user/licenses/')
        .get(licenses.readLicenses)


    // roles
    app.route('/collab/:id/roles/register')
        .post(roles.createRoles)

    app.route('/collab/:id/roles/')
        .get(roles.readRoles)


    // comments
    app.route('/project/:id/comments/register')
        .post(comments.createComments)

    app.route('/project/:id/comments/')
        .get(comments.readComments)


    // chats
    app.route('/user/:id/chats/register')
        .post(chats.createChats)

    app.route('/user/:id/chats/')
        .get(chats.readChats)


    // joinedProjects
    app.route('/joined/register/')
        .post(joinedProjects.createJoinedProjects)

    app.route('/joined/')
        .get(joinedProjects.readJoinedProjects)
};