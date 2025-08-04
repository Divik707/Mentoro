import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function auth(req:Request, res:Response, next:NextFunction) {
    const token = req.headers['authorization'];
    if(!token) {
        res.json({
            message: "no token passed"
        })
    } else {
        if(!process.env.JWT_SECRET) {
            console.log('invalid url')
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded) {
                res.json({
                    message: "invalid token"
                })
            } else {
               
                    // @ts-expect-error
                    req.userId = (decoded as { _id: string })._id;
                    next();
                } 
                }
            }
        }
