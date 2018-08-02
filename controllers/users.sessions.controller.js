const UsersSessionsService = require('../services/users.sessions.service');

class UsersSessionsController {
    static async getUsersSessions(req, res){
    	/*here we catch errors occurred while processing the request */
        try {
            const data = await UsersSessionsService.getUsersSessions();
            res.json({data});
        } catch (e) {
            console.log(e);
            res.json({data: null, errorMessage: 'Sorry, an error occurred while parsing users sessions file'});
        }
    }
}

module.exports = UsersSessionsController;