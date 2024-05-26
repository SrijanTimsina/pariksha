import { Router } from "express";
import { createCourse } from "../controllers/course.controller.js";

const router = Router();

router.route("/create").post(createCourse);

export default router;
