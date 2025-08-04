import { Router } from "express"
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { userModel } from "../../database/db.js";

const router = Router();

const userloginSchema = z.object({
    username: z.string().min(3,"to small for a username").max(10, "to large for a username"),
    password: z.string().min(3,"to small for a password").max(10, "to large for a password")
})

export const signup = router.post('/signup', async(req, res) => {
    try {
        const validInput = userloginSchema.safeParse(req.body);
        if(validInput.error) {
            res.json({
                message: "invalid input data"
            })
        }
        const username = validInput.data?.username;
        const password = validInput.data?.password;

        const user = await userModel.findOne({username});
        if(user) {
            res.json({
                message: "user already exist"
            })
        }  else {
            await userModel.create({
                username,
                password: await bcrypt.hash(password as string,10)
            })
            res.json({
                message: "user signed up"
            })
        }
    } catch (error) {
        res.json({
            message: "error error error"
        })
    }
})

export const signin = router.post('/signin', async(req, res) => {
    try {
        const validInput = userloginSchema.safeParse(req.body);
        if(validInput.error) {
            res.json({
                message: "invalid input data"
            })
        }
        const username = validInput.data?.username;
        const password = validInput.data?.password;

        const user = await userModel.findOne({username});
        if(user) {
            const verifyPassword = await bcrypt.compare(password as string, user.password);
            if(!verifyPassword) {
                res.json({
                    message: "incorrect password"
                })
            } else {
                if(!process.env.JWT_SECRET) {
                    console.log("wrong secret")
                } else {
                    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn:'10d'})
                    res.json({
                        message: "token reacted",
                        token
                    })
                }
            }
        } 
        else {
            res.json({
                message:"no such user found"
            })
        }
    } catch (error) {
        res.json({
            message: "error error error"
        })
    }
})

// get profile
//update profile
//delete profile
