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
        console.log('33333333333333333333333333333333333');
        console.log(error);
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
    var user_data_object = await UserModel.findByCredentials(req.body.email);
    if (!user_data_object) {
        console.log('inside first ifff');
        user_data_object = new UserModel({
            email: req.body.email,
            ph_number: req.body.ph_number,
            auth_token:req.body.auth_token,
            refresh_token:req.body.refresh_token,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            gender:req.body.gender,
            age:req.body.age,
            profile: req.body.profile_pic,
            display_name: req.body.display_name
        });

        await user_data_object.save()
        const token = await user_data_object.generateAuthToken()
        res.status(201).send({ user_data_object })
        /*    .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the record."
            });
        });  */
    } else {
        console.log('inside 222333');
        user_data_object.status = true;
        const token = await user_data_object.generateAuthToken();
        console.log(token);
        res.status(201).send({ user_data_object })
        // res.send({ user, token });
    }
}



// Update or edit information about user
exports.update = (req, res) => {
   // UserModel.find({email: req.params.id}, {$set:{
    req.user.updateOne({$set:{
        ph_number: req.body.ph_number,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        gender:req.body.gender,
        age:req.body.age,
        display_name: req.body.display_name
    }}).then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Record not found with id " + req.params.id
            });
        }
        res.send(req.user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Record not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating record with id " + req.params.id
        });
    });
};

// Get details about user
exports.get = (request, response) => {
    response.send(request.user)
};

// Delete user / user details / follwers following entry
exports.delete = (req, res) => {
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
    //const user = await UserModel.findByCredentials(req.body.email);
    const user = req.user;
    if (user) {
        try {
            user.tokens = user.tokens.filter((token) => {
                return token.token != req.params.id
            })
            await user.save({status: 0})
            res.send({'message': 'Successfully logged out'});
        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        res.send({ 'error': 'No such user exist in this email' });
    }    
};

//Logout user from all his devices
exports.logout_all = async(req, res) => {
    const user = await UserModel.findByCredentials(req.body.email);
    if (user) {
        try {
            user.tokens.splice(0, user.tokens.length)
            await user.save()
            res.send({message: 'Successfully Logged out from all devices'});
        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        res.send({'error': 'No such user exist in this email'})
    }    
};


