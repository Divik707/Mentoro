import { Router } from "express"
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { adminModel } from "../../database/db.js";
import { auth } from "../../lib/verifyUser.js";

const router = Router();

const adminloginSchema = z.object({
    username: z.string().min(3,"to small for a username").max(10, "to large for a username"),
    password: z.string().min(3,"to small for a password").max(10, "to large for a password")
})

export const signup = router.post('/signup', async(req, res) => {
    try {
        const validInput = adminloginSchema.safeParse(req.body);
        if(validInput.error) {
            res.json({
                message: "invalid input data"
            })
        }
        const username = validInput.data?.username;
        const password = validInput.data?.password;

        const user = await adminModel.findOne({username});
        if(user) {
            res.json({
                message: "admin already exist"
            })
        }  else {
            await adminModel.create({
                username,
                password: await bcrypt.hash(password as string,10)
            })
            res.json({
                message: "admin signed up"
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
        const validInput = adminloginSchema.safeParse(req.body);
        if(validInput.error) {
            res.json({
                message: "invalid input data"
            })
        }
        const username = validInput.data?.username;
        const password = validInput.data?.password;

        const admin = await adminModel.findOne({username});
        if(admin) {
            const verifyPassword = await bcrypt.compare(password as string, admin.password);
            if(!verifyPassword) {
                res.json({
                    message: "incorrect password"
                })
            } else {
                if(!process.env.JWT_SECRET) {
                    console.log("wrong secret")
                } else {
                    const token = jwt.sign({id: admin.id}, process.env.JWT_SECRET, {expiresIn:'10d'})
                    res.json({
                        message: "token reacted",
                        token
                    })
                }
            }
        } 
        else {
            res.json({
                message:"no such admin found"
            })
        }
    } catch (error) {
        res.json({
            message: "error error error"
        })
    }
})

export const getprofile = router.get('/profile',auth, async(req, res) => {
    try {
        //@ts-ignore
        const adminId = req.userId;
        const admin = await adminModel.findById(adminId);
        if(!admin) {
            res.json({
                message: "no such admin found"
            })
        } else {
            res.json({
                admin
            })
        }
    } catch (error) {
        res.json({
            message: "error errror error"
        })
    }
})

export const deleteProfile = router.delete('/profile', auth, async(req, res) => {
    try {
        //@ts-ignore
        const adminId = req.userId;

        await adminModel.deleteOne(adminId)
        res.json({
            message: "admin deleted"
        })
    } catch (error) {
        res.json({
            message: "error errror error"
        })
    }
})

