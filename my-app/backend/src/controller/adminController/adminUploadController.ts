import e, { Router } from "express"
import { auth } from "../../lib/verifyUser.js";
import z, { core } from "zod";
import { courseModel, vedioCommentsModel } from "../../database/db.js";

const router = Router();

const courseSchema = z.object({
    title: z.string().min(1, "too short for title").max(10, "too long for title"),
    vedioUrl: z.array(z.string().url("Invalid URL")),
    thumbnailUrl: z.array(z.string().url("Invalid URL")),
    fees: z.number(),
    description: z.string().min(5, "too short for description").max(50, "too long for description")
})

export const uploadCourse = router.post('/upload', auth, async(req, res) => {
    try {
        const inputData = courseSchema.safeParse(req.body);
        if(inputData.error) {
            console.log(inputData.error)
            res.json({
                message: "invalid input from user"
            })
        } else {
            //@ts-ignore
            const adminId = req.userId;
            const course = await courseModel.create({
                title: inputData.data.title,
                vedioUrl:inputData.data.vedioUrl,
                thumbnailUrl:inputData.data.thumbnailUrl,
                fees: inputData.data.fees,
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

export const getVedioComments = router.get('/vedio/:id/comments', auth, async (req, res) => {
    try {
        const vedioId = req.params.id;

        if (!vedioId || vedioId.length !== 24) {
            return res.status(400).json({ message: "Invalid video ID" });
        }

        const commentsDoc = await vedioCommentsModel.findOne({ vedio: vedioId });

        if (!commentsDoc) {
            return res.status(404).json({ message: "No comments found for this video" });
        }

        res.json({
            vedioId,
            comments: commentsDoc.comments
        });
    } catch (error) {
        console.error("Error getting video comments:", error);
        res.status(500).json({ message: "Server error" });
    }
});


export const popComment = router.delete('/comments/:videoId/pop', auth, async (req, res) => {
    try {
        const vedioId = req.params.videoId;
        const indexParam = req.query.index;

        // Ensure index is a string and parse it safely
        const index = typeof indexParam === 'string' ? parseInt(indexParam, 10) : NaN;

        const commentDoc = await vedioCommentsModel.findOne({ vedio: vedioId });

        if (!commentDoc) {
            return res.status(404).json({ message: "No comments found" });
        }

        if (isNaN(index) || index < 0 || index >= commentDoc.comments.length) {
            return res.status(400).json({ message: "Invalid comment index" });
        }

        // Remove the comment at the specified index
        commentDoc.comments.splice(index, 1);
        await commentDoc.save();

        res.json({ message: "Comment removed", comments: commentDoc.comments });
    } catch (error) {
        console.error("Error deleting video comment:", error);
        res.status(500).json({ message: "Server error" });
    }
});
