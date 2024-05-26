import { Router } from "express";

import { createSubject } from "../controllers/subject.controller.js";

const router = Router();

router.route("/create").post(createSubject);

export default router;
