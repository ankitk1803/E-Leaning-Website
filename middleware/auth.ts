// redis pe se logout krne ke liye
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, {JwtPayload} from "jsonwebtoken";
import {redis} from "../utils/redis";

// Authenticated User

export const isAuthenticated = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    const access_token = req.cookies.access_token as string;

    console.log("Yaha puhucha ")

    if(!access_token){
        console.log("nhi mila")
        return next(new ErrorHandler("Please login to access this resource", 400));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if(!decoded){
        return next(new ErrorHandler("access token is not valid", 400));
    }

    const user = await redis.get(decoded.id);
    if(!user){
        return next(new ErrorHandler("user not found",400));
    }

    req.user = JSON.parse(user);

    next();
});

// Validate user role 🔴🔴🔴🔴🔴

export const authorizeRoles = (...roles: string[]) =>{
    return (req:Request, res: Response, next: NextFunction)=>{
        if(!roles.includes(req.user?.role || '')){
            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`,403));
        }
        next();
    }
}

