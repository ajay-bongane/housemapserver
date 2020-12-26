const controller = require('../controller/controller');
const auth = require('../controller/auth');

// Express route handler
module.exports = function(app){
    app.route('/').get(controller.getDefault);
    app.route('/loginuser').post(controller.loginUser);
    app.route('/addnewprofile').post(controller.addNewProfile);
    app.route('/gethousemap').get(auth, controller.getHouseMap);
    app.route('/updatehousemap').put(auth, controller.updateHouseMap);
    //app.route('/addnewhouse').post(controller.addNewHouse);
};