import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createQuestionSet,
  getAllQuestionSets,
  getQuestionSet,
  submitTestAnswers,
} from "../controllers/questionset.controller.js";
import nocache from "nocache";

const router = Router();

router.route("/create/:type").post(createQuestionSet);
router.route("/getAllQuestionSets").get(getAllQuestionSets);
router.route("/getQuestionSetData/:link").get(verifyJWT, getQuestionSet);
router
  .route("/submitTestAnswers/:id")
  .post(nocache(), verifyJWT, submitTestAnswers);

export default router;
