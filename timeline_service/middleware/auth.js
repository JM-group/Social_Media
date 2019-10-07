const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const auth = async(req, res, next) => {
    const token = req.query.tokens;
    console.log(token);
    var data = '';
    try {
        data = jwt.verify(token, 'lorem')
        const user = await User.findOne({ _id: data._id._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth









