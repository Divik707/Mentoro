import { Router } from "express"

import { getAllCourses, getCourses, getPurchaseCourse, purchaseCourse } from "../controller/userController/userPurchaseController.js";
import { signin, signup } from "../controller/userController/userAuthController.js";

const router = Router();

router.use('/user', signup)
router.use('/user', signin)
router.use('/user', getAllCourses)
router.use('/user', getCourses)
router.use('/user', purchaseCourse)
router.use('/user', getPurchaseCourse)

export default router;