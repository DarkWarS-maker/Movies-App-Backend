import jwt from "jsonwebtoken";
import ash from "express-async-handler";
import User from '../models/User.js'
export const isAuth = ash(async (req, res, next) => {
  let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            
            token = req.headers.authorization.split(' ')[1]
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY );
            
            req.user_id = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
             res.status(401);
			 throw new Error("Authorization Error,Token Failed");
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Authorization Error, No Token Found')
    }
});
