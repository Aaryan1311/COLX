import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.access_token; 

    if (!token) {
        return next(errorHandler(401, 'Unauthorized')); 
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            console.error(err); 
            return next(errorHandler(403, 'Forbidden'));
        }

        req.user = user; 
        next(); 
    });
};