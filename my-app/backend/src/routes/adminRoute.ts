import { Router } from "express"
import { signin, signup } from "../controller/adminController/adminAuthController.js";
import { getUploadCourse, uploadCourse } from "../controller/adminController/adminUploadController.js";

const router = Router();

router.use('/admin', signup)
router.use('/admin', signin)
router.use('/admin', uploadCourse)
router.use('/admin', getUploadCourse)

export default router;