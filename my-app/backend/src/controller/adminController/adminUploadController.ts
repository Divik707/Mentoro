import e, { Router } from "express"
import { auth } from "../../lib/verifyUser.js";
import z from "zod";
import { courseModel } from "../../database/db.js";

const router = Router();
const courseSchema = z.object({
    title: z.string().min(1, "too short for title").max(10, "too long for title"),
    description: z.string().min(5, "too short for description").max(50, "too long for description")
})

export const uploadCourse = router.post('/upload', auth, async(req, res) => {
    try {
        const inputData = courseSchema.safeParse(req.body);
        if(inputData.error) {
            res.json({
                message: "invalid input from user"
            })
        } else {
            //@ts-ignore
            const adminId = req.userId;
            const course = await courseModel.create({
                title: inputData.data.title,
                description: inputData.data.description,
                adminId
            })
            res.json({
                message: "course created",
                course
            })
        }
    } catch (error) {
        res.json({
            message: "error error error"
        })
    }
})

export const getUploadCourse = router.get('/upload', auth, async(req, res) => {
    try {
        //@ts-ignore
        const adminId = req.userId;
        const courses = await courseModel.find(adminId)
        if(!courses) {
            res.json({
                message: "no such courses found"
            })
        } else {
            res.json({
                courses
            })
        }
    } catch (error) {
        res.json({
            message: "error error error"
        })
    }
})


//vedio uploads thread uploads from admin
