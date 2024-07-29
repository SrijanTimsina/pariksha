import { Router } from "express";
import nocache from "nocache";

import {
  createVideo,
  getVideo,
  updateUserWatchHistory,
  addToWatchHistory,
  getWatchHistory,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(createVideo);
router.route("/getVideo/:videoId/:subjectName").get(verifyJWT, getVideo);
router
  .route("/updateUserWatchHistory")
  .post(nocache(), verifyJWT, updateUserWatchHistory);
router
  .route("/addToWatchHistory")
  .post(nocache(), verifyJWT, addToWatchHistory);
router
  .route("/getWatchHistory/:count")
  .get(nocache(), verifyJWT, getWatchHistory);

export default router;
