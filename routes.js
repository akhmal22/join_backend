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

    // backend root
    app.get('/', function(req, res){
        res.send("Homepage")
    });


    // user
    app.route('/users')
        .get(users.readUsers);
    
    app.route('/user/register')
        .post(users.createUsers);

    app.route('/user/login')
        .post(users.loginUsers);

    app.route('/user/token')
        .put(users.updateToken);

    app.route('/user/:id')
        .put(users.updateUsers);

    app.route('/user/:id')
        .delete(users.deleteUsers);

    
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

    app.route('/user/experiences/:id')
        .put(experiences.updateExperiences)

    app.route('/user/experiences/:id')
        .delete(experiences.deleteExperiences)
    

    // skills
    app.route('/user/skills/register')
        .post(skills.createSkills)

    app.route('/user/skills/')
        .get(skills.readSkills)

    app.route('/user/skills/:id')
        .put(skills.updateSkills)

    app.route('/user/skills/:id')
        .delete(skills.deleteSkills)


    // portfolios
    app.route('/user/portfolios/register')
        .post(portfolios.createPortfolios)

    app.route('/user/portfolios/')
        .get(portfolios.readPortfolios)

    app.route('/user/portfolios/:id')
        .put(portfolios.updatePortfolios)

    app.route('/user/portfolios/:id')
        .delete(portfolios.deletePortfolios)
    

    // licenses
    app.route('/user/licenses/register')
        .post(licenses.createLicenses)

    app.route('/user/licenses/')
        .get(licenses.readLicenses)

    app.route('/user/licenses/:id')
        .put(licenses.updateLicenses)

    app.route('/user/licenses/:id')
        .delete(licenses.deleteLicenses)


    // roles
    app.route('/collab/:id/roles/register')
        .post(roles.createRoles)

    app.route('/collab/:id/roles/')
        .get(roles.readRoles)

    app.route('/user/roles/:id')
        .put(roles.updateRoles)

    app.route('/user/roles/:id')
        .delete(roles.deleteRoles)


    // comments
    app.route('/project/:id/comments/register')
        .post(comments.createComments)

    app.route('/project/:id/comments/')
        .get(comments.readComments)

    app.route('/project/:id/comments/:id')
        .put(comments.updateComments)

    app.route('/project/:id/comments/:id')
        .delete(comments.deleteComments)


    // chats
    app.route('/user/:id/chats/register')
        .post(chats.createChats)

    app.route('/user/:id/chats/')
        .get(chats.readChats)

    app.route('/user/:id/chats/:id')
        .put(chats.updateChats)

    app.route('/user/:id/chats/:id')
        .delete(chats.deleteChats)


    // joinedProjects
    app.route('/joined/register/')
        .post(joinedProjects.createJoinedProjects)

    app.route('/joined/')
        .get(joinedProjects.readJoinedProjects)

    app.route('/joined/:id')
        .put(joinedProjects.updateJoinedProjects)

    app.route('/joined/:id')
        .delete(joinedProjects.deleteJoinedProjects)
};