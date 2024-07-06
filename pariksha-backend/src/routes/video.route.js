import { Router } from "express";

import {
  createVideo,
  getVideo,
  updateUserWatchHistory,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(createVideo);
router.route("/getVideo/:videoId/:subjectName").get(verifyJWT, getVideo);
router.route("/updateUserWatchHistory").post(verifyJWT, updateUserWatchHistory);

export default router;
