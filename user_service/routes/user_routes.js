module.exports = (app) => {
    const user = require('../controllers/user_controller.js');

    // Create a new Record
    app.post('/user', user.create);

    // Update a Note with festiveId
    app.put('/user/:id', user.update);

    // Get user details and followers information
    app.get('/user/:id', user.get);
    
    // Delete a Note with festiveId
    app.delete('/user/:id', user.delete);
   
}
