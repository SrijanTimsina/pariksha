import { Router } from "express";

import { createVideo } from "../controllers/video.controller.js";

const router = Router();

router.route("/create").post(createVideo);

export default router;
