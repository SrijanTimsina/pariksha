import { Router } from "express";

import {
  createSubject,
  getSubjectInfo,
} from "../controllers/subject.controller.js";

const router = Router();

router.route("/create").post(createSubject);
router.route("/getSubjectInfo/:courseTitle/:subjectTitle").get(getSubjectInfo);

export default router;
