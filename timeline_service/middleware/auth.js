const jwt = require('jsonwebtoken')
const User = require('../../user_service/models/user.js')

const auth = async(req, res, next) => {
    console.log("valueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    console.log(req.params);
    const token = req.params.id;
    console.log(token);
    var data = '';
    try {
        data = jwt.verify(token, 'lorem')
        console.log("before findin user ==", data);
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        //console.log(user);
        if (!user) {
            console.log("inside error vale hereeee");
            throw new Error()
        }
        console.log("after error");
        req.user = user
        req.token = token
        console.log("befre nexttttt");
        next()
    } catch (error) {
        console.log("catch errir heredsfsfs");
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth









