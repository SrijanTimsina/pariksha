import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseData,
} from "../controllers/course.controller.js";

const router = Router();

router.route("/create").post(createCourse);
router.route("/getAllCourses").get(getAllCourses);
router.route("/getCourseData/:link").get(getCourseData);

export default router;
