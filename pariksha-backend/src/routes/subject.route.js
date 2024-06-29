import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  createSubject,
  getSubjectInfo,
  updateUserSubjectVideo,
} from "../controllers/subject.controller.js";

const router = Router();

router.route("/create").post(createSubject);
router.route("/getSubjectInfo/:courseTitle/:subjectTitle").get(getSubjectInfo);
router.route("/updateUserSubjectVideo").post(verifyJWT, updateUserSubjectVideo);

export default router;
