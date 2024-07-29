import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import nocache from "nocache";

import {
  createSubject,
  getSubjectInfo,
  updateUserSubjectVideo,
} from "../controllers/subject.controller.js";

const router = Router();

router.route("/create").post(createSubject);
router.route("/getSubjectInfo/:courseTitle/:subjectTitle").get(getSubjectInfo);
router
  .route("/updateUserSubjectVideo")
  .post(nocache(), verifyJWT, updateUserSubjectVideo);

export default router;
