import { Router } from "express";
import { auth } from "../../lib/verifyUser.js";
import { courseModel, purchaseModel } from "../../database/db.js";

const router = Router();

export const getAllCourses = router.get('/courses', auth, async(req,res) => {
    try {
        const courses = await courseModel.find();
        if(!courses) {
            res.json({
                message: "no courses fetched"
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

export const getCourses = router.get('/courses/:id', auth, async(req,res) => {
    try {
        const courseId = req.params.id;
        const result = await courseModel.findById(courseId);
        if(!result) {
            res.json({
                message: "no such course founded"
            })
        } else {
            res.json({
                result
            })
        }
    } catch (error) {
        res.json({
            message: "error error error"
        })
    }
})

export const purchaseCourse = router.post('/course/:id/purchase', auth, async(req,res) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const courseId = req.params.id;
        const getCourse = await courseModel.findById(courseId);
        if(!getCourse) {
            res.json({
                message: "no such course founded"
            })
        } else {
            await purchaseModel.create({
                paid: true,
                userId,
                adminId: getCourse.adminId,
                courseId:getCourse._id
            })
            res.json({
                message: "course purchased"
            })
        }
    } catch (error) {
        res.json({
            message: "error error error"
        })
    }
})

export const getPurchaseCourse = router.get('/purchases', auth, async (req, res) => {
    try {
      //@ts-ignore
      const userId = req.userId;
  
      // Find all purchases by this user
      const purchases = await purchaseModel.find({ userId });
  
      if (!purchases || purchases.length === 0) {
        return res.status(404).json({
          message: "No purchased courses found"
        });
      }
  
      // Get all related course details
      const courseIds = purchases.map(p => p.courseId);
      const courses = await courseModel.find({ _id: { $in: courseIds } });
  
      res.status(200).json({
        message: "Courses fetched successfully",
        courses
      });
  
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });
  

// once purchases cannt be opurchases again
// money razerpay integration