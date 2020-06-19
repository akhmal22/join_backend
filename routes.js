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
    var reportP = require('./controller/reportP');
    var reportU = require('./controller/reportU');
    var cors = require('cors');
    var jwt = require('jsonwebtoken');

    app.use(cors())

    // backend root
    app.get('/', function(req, res){
        res.send("Homepage")
    });

    // == Prerequisites ==

    // login
    app.route('/user/login')
        .post(users.loginUsers);

    // register
    app.route('/user/register')
        .post(users.createUsers);

    // == endof Prerequisites ==


    // == A1 Manage project ==

    // == endof A1 Manage project ==

    // == A2 Search for Project ==

    // == endof A2 Search for Project ==

    // == A3 Apply to Project ==

    // == endof A3 Apply to Project ==

    // == A4 Ask about Project ==

    // == endof A4 Ask about Project ==

    // == A5 Apply to Join Project ==

    // add joinedProject

    // == endof A5 Apply to Join Project ==

    // == A6 Manage Profile ==

    // == endof A6 Manage Profile ==

    // == A7 Manage Report ==

    // == endof A7 Manage Report ==

    // == A8 Follow-up Report ==

    // == endof A8 Follow-up Report ==

    // == A9 Report User/Project ==

    // == endof A9 Report User/Project ==

    // === endof routes ===


    // === STASH ===

    // === Chats ===

    // read chats
    app.route('/chat/owned/:id')
        .get(chats.readChats);

    // send chat
    app.route('/chat/to/:recipient_id')
        .post(chats.postChats);

    // === endof Chats ===

    // === Comments ===

    // read comment
    app.route('/comment/:project_id')
        .get(comments.readComments);

    // post comment
    app.route('/comment/post')
        .post(comments.createComments);

    // delete comment
    app.route('/comment/:id')
        .delete(comments.deleteComments);

    // === endof Comments ===

    // === Collaborators ===

    app.route('/project/:id/collaborators')
        .get(collaborators.readCollaborators);

    app.route('/project/:id/collaboratorcount')
        .get(collaborators.countCollaborators);

    app.route('/project/:id/collaborator/register')
        .post(collaborators.createCollaborators);

    app.route('/collaborator/:id')
        .put(collaborators.updateCollaboratorsStatus);

    app.route('/collaborator/:id')
        .delete(collaborators.deleteCollaborators);

    app.route('/collaborators')
        .get(collaborators.readAllCollaborators);

    // === endof Collaborators ===

    // === Experiences ===

    app.route('/user/:id/experiences')
        .get(experiences.readExperiences);

    app.route('/user/experience')
        .post(experiences.createExperiences);

    app.route('/user/experience/:id')
        .put(experiences.updateExperiences);

    app.route('/user/experience/:id')
        .delete(experiences.deleteExperiences);

    // === endof Experiences ===

    // === JoinedProject ===

    app.route('/joined/register')
        .post(joinedProjects.createJoinedProjects);

    app.route('/joined/')
        .get(joinedProjects.readJoinedProjects);

    app.route('/joined/:id')
        .delete(joinedProjects.deleteJoinedProjects);

    // === endof JoinedProject ===

    // === Licenses ===

    app.route('/user/:user_id/licenses')
        .get(licenses.readLicenses);

    app.route('/user/license')
        .post(licenses.createLicenses);

    app.route('/user/license/:id')
        .put(licenses.updateLicenses);

    app.route('/user/license/:id')
        .delete(licenses.deleteLicenses);

    // === endof Licenses ===

    // === Portfolios ===

    app.route('/user/:user_id/portfolios')
        .get(portfolios.readPortfolios);

    app.route('/user/portfolio')
        .post(portfolios.createPortfolios);

    app.route('/user/portfolio/:id')
        .put(portfolios.updatePortfolios);

    app.route('/user/portfolio/:id')
        .delete(portfolios.deletePortfolios);

    // === endof Portfolios ===

    // === Projects ===

    // view owned project (get)[project]
    app.route('/project/:id')
        .get(projects.readOneProject);

    // list of owned project (get)[project]
    app.route('/projects/:username')
        .get(projects.readOwnedProjects);

    app.route('/projects')
        .get(projects.readAllProjects);

    // create project (post)[project]
    app.route('/project/register')
        .post(projects.createProjects, cors())

    // edit project (put)[project]
    app.route('/project/:id/description')
        .put(projects.updateDescription);

    app.route('/project/:id/start')
        .put(projects.updateStartDate);

    app.route('/project/:id/end')
        .put(projects.updateEndDate);

    app.route('/project/:id/due')
        .put(projects.updateDueDate);

    app.route('/project/:id/reqcoll')
        .put(projects.updateColl);

    app.route('/project/:id/status')
        .put(projects.updateStatus);

    app.route('/project/:id/')
        .put(projects.updateProjects);

    // delete project (delete)[project]
    app.route('/project/:id')
        .delete(projects.deleteProjects)

    // debugging purposes
    app.route('/projects')
        .get(projects.readAllProjects);

    // === endof project ===

    // === ReportP ===

    app.route('/report/projects')
        .get(reportP.readReportP);

    app.route('/report/project/:id')
        .get(reportP.readOneReportP);

    app.route('/report/project')
        .post(reportP.createReportP);

    app.route('/report/project/:id')
        .delete(reportP.deleteReportP);

    // === endof ReportP ===

    // === ReportU ===

    app.route('/report/users')
        .get(reportU.readReportU);

    app.route('/report/user/:id')
        .get(reportU.readOneReportU);

    app.route('/report/user')
        .post(reportU.createReportU);

    app.route('/report/user/:id')
        .delete(reportU.deleteReportU);

    // === endof ReportU ===

    // === Roles ===

    app.route('/project/:project_id/roles')
        .get(roles.readRolesOnProject);

    app.route('/roles')
        .get(roles.readRoles);

    app.route('/role/register')
        .post(roles.createRoles);

    app.route('/role/:id')
        .put(roles.updateRoles);

    app.route('/role/:id')
        .delete(roles.deleteRoles);

    // === endof Roles ===

    // === Skills ===

    app.route('/user/:user_id/skills')
        .get(skills.readUserSkills);

    app.route('/user/skill')
        .post(skills.createSkills);

    app.route('/user/skill/:id')
        .put(skills.updateSkills);

    app.route('/user/skill/:id')
        .delete(skills.deleteSkills);

    app.route('/user/skills')
        .get(skills.readSkills);

    // === endof Skills ===

    // === Users ===

    app.route('/users')
        .get(users.readUsers);

    app.route('/user/:username')
        .get(users.readOneUser);

/*
    app.route('/user/token')
        .put(users.updateToken);
*/

    app.route('/token/:username')
        .get(users.getToken);

    app.route('/user/:id')
        .put(users.updateUsers);

    app.route('/user/:id')
        .delete(users.deleteUsers);

    // === endof Users ===

};
