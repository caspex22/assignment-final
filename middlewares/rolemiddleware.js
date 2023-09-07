const jwt = require('jsonwebtoken');
dotenv.config();


function checkRole(roleRequired) {
    return (req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                message: 'Authentication Failed, token not found'
            })
        }

        jwt.verify(token, dotenv, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Authentication Failed, token not valid'
                })
            }

            if (decoded.role !== roleRequired) {
                return res.status(401).json({
                    message: 'Authentication Failed, role not valid'
                })
            }
            req.user = decoded;
            next();
        }
        )
    }
}

module.exports = checkRole;