import { Router } from "express";

import { createVideo, getVideo } from "../controllers/video.controller.js";

const router = Router();

router.route("/create").post(createVideo);
router.route("/getVideo/:videoId").get(getVideo);

export default router;
