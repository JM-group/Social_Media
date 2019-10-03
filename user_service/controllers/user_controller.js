const UserModel = require('../models/user.js');
const UserDetailsModel = require('../models/user_details.js')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js');

// Create and Save a new User
exports.create = async(req, res) => {
    try {
       // UserModel.init().then(() => {
            const user_data_object = new UserModel({
                email: req.body.email,
                ph_number: req.body.ph_number,
                auth_token:req.body.auth_token,
                refresh_token:req.body.refresh_token,
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                gender:req.body.gender,
                age:req.body.age,
            });

            // Save 
            await user_data_object.save()
            
           const token = await user_data_object.generateAuthToken()
            res.status(201).send({ user_data_object })
    } catch (error) {
        res.status(400).send(error)
    }    
};

/*
   JSON structure to create user
   {
        "email": "mashif2134@gmail.com",
        "ph_number": 16478037288,
        "auth_token": "156a",
        "refresh_token": "5679",
        "first_name": "Mohamed",
        "last_name": "12355Ashif",
        "gender": "Male",
        "age": 22,
        "profile_pic": PHOTOURL
    }

*/

exports.login = async(req, res) => {
    console.log(req.body.email);
    console.log('///////////////////////////');
    const user = await UserModel.findByCredentials(req.body.email);
    console.log(user);
    if (!user) {
        console.log('inside first ifff');
        const user_data_object = new UserModel({
            email: req.body.email,
            ph_number: req.body.ph_number,
            auth_token:req.body.auth_token,
            refresh_token:req.body.refresh_token,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            gender:req.body.gender,
            age:req.body.age,
        });

        // Save 
        user_data_object.save().then(data => {
            console.log('inside then fun hereeeeeeee //////// <<<<>>>>>><<<>>>');
            console.log(data);
            res.send(data);
        }).catch(err => {
            console.log('inside errorr here main');
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the record."
            });
        });
    } else {
        console.log('inside 222333');
        user.status = true;
        const token = await user.generateAuthToken('login');
        console.log(token);
        res.send({ user, token });
    }
}



// Update or edit information about user
exports.update = (req, res) => {
    console.log(req.body);
    console.log(req.body.email);
    console.log(req.query);
    console.log(req.params.id);
    console.log('//////////');
    UserModel.findByIdAndUpdate(req.params.id, {$set:{
        email: req.body.email,
        ph_number: req.body.ph_number,
        auth_token:req.body.auth_token,
        refresh_token:req.body.refresh_token,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        gender:req.body.gender,
        age:req.body.age
    }}, {new: true})
    .then(data => {
        console.log('inside theeennnnnnn herreeeee');
        console.log(data);
        if(!data) {
            return res.status(404).send({
                message: "Record not found with id " + req.params.festiveId
            });
        }
        res.send(data);
    }).catch(err => {
        console.log('inside erroeeeerrrrrrrrr');
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Record not found with id " + req.params.festiveId
            });                
        }
        return res.status(500).send({
            message: "Error updating record with id " + req.params.festiveId
        });
    });
    
    /* function (err, response) {
      // Handle any possible database errors
      if (err) {
        console.log("we hit an error" + err);
        response.json({
          message: 'Database Update Failure'
        });
      } else {
        console.log(response);
        response.json({
            message: 'SSSSSS'
        })
      }
      console.log("This is the Response: " + res);
    } */
};

// Get details about user
exports.get = (request, response) => {
    UserModel.findById(request.params.id).exec().then(data => {
        response.send(data);
    }).catch(err => {
        response.status(500).send({
            message: err.message || "Some error occurred while creating the record."
        });
    }); 
};

// Delete user / user details / follwers following entry
exports.delete = (req, res) => {
    /* try {
        var result = UserModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }  */
    UserModel.findByIdAndRemove(req.params.id)
    .then(festive => {
        if(!festive) {
            return res.status(404).send({
                message: "Record not found with id " + req.params.festiveId
            });
        }
        res.send({message: "Record deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Record not found with id " + req.params.festiveId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.festiveId
        });
    });
};

//Logout user form his/her device
exports.logout = async(req, res) => {
    console.log('11111111111111111111');
    console.log(req.body)
    console.log(req.body.email)
    console.log(req.body.token);
    const user = await UserModel.findByCredentials(req.body.email);
    if (user) {
        try {
            user.tokens = user.tokens.filter((token) => {
                return token.token != req.body.token
            })
            await user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        res.send({ 'error': 'No such user exist in this email' });
    }    
};

//Logout user from all his devices
exports.logout_all = async(req, res) => {
    console.log('22222222222222');
    console.log(req.body)
    console.log(req.body.email)
    console.log(req.body.token)
    const user = await UserModel.findByCredentials(req.body.email);
    if (user) {
        try {
            user.tokens.splice(0, user.tokens.length)
            await user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        res.send({'error': 'No such user exist in this email'})
    }    
};
