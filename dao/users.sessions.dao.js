const fs = require('fs');
const readFileAsync = require('util').promisify(fs.readFile);
const {createFileRowsStructure} = require('../helpers/users.session.helpers');

class UsersSessionsDao {
    static async getUsersSessions(){
        const readedBuffer = await readFileAsync('./airbnb_session_data.txt');

        return createFileRowsStructure(readedBuffer.toString().split('\n'));
    }
}
module.exports = UsersSessionsDao;
